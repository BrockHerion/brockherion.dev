import clsx from "clsx";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "rounded-xl border border-zinc-50 overflow-hidden bg-neutral-950 p-4",
      className
    )}
    {...props}
  />
));

export { Card };
