import clsx from "clsx";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("border-y border-zinc-50 overflow-hidden py-4", className)}
    {...props}
  />
));

export { Card };
