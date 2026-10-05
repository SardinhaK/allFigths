import { ACADEMY } from "@/lib/academy";
import { cn } from "@/lib/utils";

export function DojoStamp({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dimension =
    size === "lg" ? "size-36" : size === "sm" ? "size-16" : "size-24";
  const kanji =
    size === "lg" ? "text-6xl" : size === "sm" ? "text-2xl" : "text-4xl";

  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-full border-[3px] border-primary text-primary shadow-[0_0_0_4px_oklch(0.12_0.015_25),0_0_0_6px_var(--primary)]",
        dimension,
        className
      )}
      aria-hidden="true"
    >
      <span className={cn("font-jp leading-none font-semibold", kanji)}>
        {ACADEMY.kanji}
      </span>
    </div>
  );
}
