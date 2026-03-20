"use client";

import { useEffect, useState } from "react";

interface ImpactCounterProps {
  strawKg: number;
}

function useAnimatedNumber(target: number, duration: number = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(start + (target - start) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}

export default function ImpactCounter({ strawKg }: ImpactCounterProps) {
  // Estimates
  const envelopes = Math.round(strawKg * 80); // ~80 envelopes per kg
  const co2Saved = Math.round(strawKg * 1.3); // 1.3 kg CO2 per kg straw burned
  const treesEquiv = Math.round(strawKg * 0.05); // rough estimate

  const animEnvelopes = useAnimatedNumber(envelopes);
  const animCo2 = useAnimatedNumber(co2Saved);
  const animTrees = useAnimatedNumber(treesEquiv);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl bg-cream p-3 text-center">
        <p className="text-xl font-bold text-forest">{animEnvelopes.toLocaleString()}</p>
        <p className="text-xs text-gray-500">Bao bì có thể sản xuất</p>
      </div>
      <div className="rounded-xl bg-cream p-3 text-center">
        <p className="text-xl font-bold text-burn">{animCo2.toLocaleString()} kg</p>
        <p className="text-xs text-gray-500">CO2 tiết kiệm</p>
      </div>
      <div className="rounded-xl bg-cream p-3 text-center">
        <p className="text-xl font-bold text-sage">{animTrees}</p>
        <p className="text-xs text-gray-500">Cây xanh tương đương</p>
      </div>
    </div>
  );
}
