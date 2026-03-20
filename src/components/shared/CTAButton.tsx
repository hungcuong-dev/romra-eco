import Link from "next/link";

interface CTAButtonProps {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  external?: boolean;
}

export default function CTAButton({
  href,
  variant = "primary",
  children,
  external = false,
}: CTAButtonProps) {
  const baseStyles =
    "inline-block rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center";
  const variants = {
    primary: "bg-gold text-forest-dark hover:shadow-gold/30",
    outline: "border-2 border-gold text-gold hover:bg-gold/10",
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
