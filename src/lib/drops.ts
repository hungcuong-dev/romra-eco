import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  display_name: string | null;
  total_drops: number;
  streak_count: number;
  last_checkin: string | null; // "YYYY-MM-DD"
  created_at: string;
}

const supabase = () => createClient();

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase()
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (data) return data as UserProfile;

  // Profile doesn't exist yet — create it
  if (error?.code === "PGRST116" || !data) {
    const { data: newProfile, error: insertError } = await supabase()
      .from("user_profiles")
      .upsert({ id: userId, total_drops: 0, streak_count: 0 })
      .select()
      .single();

    if (insertError || !newProfile) return null;
    return newProfile as UserProfile;
  }

  return null;
}

export async function addDrops(userId: string, amount: number): Promise<number> {
  const profile = await getProfile(userId);
  if (!profile) return 0;

  const newTotal = profile.total_drops + amount;
  await supabase()
    .from("user_profiles")
    .update({ total_drops: newTotal })
    .eq("id", userId);

  // Also contribute to active campaigns
  await contributeToCampaigns(amount);

  return newTotal;
}

export async function doCheckin(userId: string): Promise<{
  success: boolean;
  drops: number;
  streak: number;
  alreadyCheckedIn: boolean;
}> {
  const profile = await getProfile(userId);
  if (!profile) return { success: false, drops: 0, streak: 0, alreadyCheckedIn: false };

  const today = new Date().toISOString().split("T")[0];

  // Already checked in today
  if (profile.last_checkin === today) {
    return {
      success: true,
      drops: 0,
      streak: profile.streak_count,
      alreadyCheckedIn: true,
    };
  }

  // Calculate streak
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const newStreak = profile.last_checkin === yesterday ? profile.streak_count + 1 : 1;

  // Calculate multiplier
  let multiplier = 1;
  if (newStreak >= 30) multiplier = 3;
  else if (newStreak >= 7) multiplier = 2;
  else if (newStreak >= 3) multiplier = 1.5;

  const dropsEarned = Math.floor(1 * multiplier);
  const newTotal = profile.total_drops + dropsEarned;

  await supabase()
    .from("user_profiles")
    .update({
      last_checkin: today,
      streak_count: newStreak,
      total_drops: newTotal,
    })
    .eq("id", userId);

  // Contribute checkin drops to campaigns
  await contributeToCampaigns(dropsEarned);

  return {
    success: true,
    drops: dropsEarned,
    streak: newStreak,
    alreadyCheckedIn: false,
  };
}

// Reading drops — stored per-day to track daily limit
export async function getReadingState(userId: string): Promise<{
  seconds: number;
  dropsEarned: number;
}> {
  const today = new Date().toISOString().split("T")[0];
  const key = `reading_${today}`;

  // Use localStorage for seconds tracking (real-time), but drops go to DB
  if (typeof window === "undefined") return { seconds: 0, dropsEarned: 0 };

  const raw = localStorage.getItem(`reading_${userId}`);
  if (!raw) return { seconds: 0, dropsEarned: 0 };

  const data = JSON.parse(raw);
  if (data.date !== today) return { seconds: 0, dropsEarned: 0 };

  return { seconds: data.seconds || 0, dropsEarned: data.dropsEarned || 0 };
}

export function saveReadingLocal(userId: string, seconds: number, dropsEarned: number) {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(`reading_${userId}`, JSON.stringify({ date: today, seconds, dropsEarned }));
}

// ── Campaigns ──

export interface CampaignRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  target_amount: number;
  current_amount: number;
  cover_image: string;
  drop_value_vnd: number;
  status: "active" | "completed";
}

export async function getCampaigns(): Promise<CampaignRow[]> {
  const { data } = await supabase()
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: true });

  return (data || []) as CampaignRow[];
}

/** Add drops contribution to ALL active campaigns */
export async function contributeToCampaigns(dropsAmount: number) {
  const { data: campaigns } = await supabase()
    .from("campaigns")
    .select("id, current_amount, target_amount, drop_value_vnd")
    .eq("status", "active");

  if (!campaigns || campaigns.length === 0) return;

  // Split drops evenly across active campaigns
  const dropsPerCampaign = dropsAmount / campaigns.length;

  for (const campaign of campaigns) {
    const addVnd = Math.floor(dropsPerCampaign * campaign.drop_value_vnd);
    const newAmount = Math.min(campaign.current_amount + addVnd, campaign.target_amount);

    await supabase()
      .from("campaigns")
      .update({ current_amount: newAmount })
      .eq("id", campaign.id);
  }
}
