import type { ComponentPropsWithRef, ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type LinkProps = CommonProps &
  Omit<ComponentPropsWithRef<"a">, "href" | "className" | "children"> & {
    href: string;
    /** Open in a new tab even for a same-origin URL. */
    newTab?: boolean;
  };

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type BracketButtonProps = LinkProps | ButtonProps;

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * `[ TEXT ]` call to action (02 s5.2). The brackets are CSS pseudo-elements
 * with empty alt text, so assistive tech reads only the label.
 */
export default function BracketButton(props: BracketButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const cls = [
    "btn",
    variant === "secondary" && "btn--secondary",
    size === "sm" && "btn--sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.href === undefined) {
    const { children: _c, variant: _v, size: _s, className: _cn, type = "button", ...rest } = props;
    return (
      <button type={type} className={cls} {...rest}>
        {children}
      </button>
    );
  }

  const { children: _c, variant: _v, size: _s, className: _cn, href, newTab, ...rest } = props;

  if (isExternal(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="btn__ext" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  if (newTab || !href.startsWith("/")) {
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
