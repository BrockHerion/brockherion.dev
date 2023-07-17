import clsx from "clsx";
import * as React from "react";

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={clsx(
      "border-b-2 border-transparent hover:border-amber-700 text-zinc-300 hover:text-zinc-50 text-sm",
      className
    )}
    {...props}
  />
));

export { Link };
