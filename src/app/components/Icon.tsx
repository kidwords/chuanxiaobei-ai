import type { SVGProps, ReactElement, ReactNode } from "react";
import { createElement } from "react";
import type { LucideIcon } from "lucide-react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number;
  strokeWidth?: number;
  /** lucide 图标组件。React 19 下不能直接作为 ReactNode 渲染，因此我们内部展平。 */
  children: LucideIcon;
}

export function Icon({ size = 16, strokeWidth = 1.75, className, children, ...rest }: IconProps) {
  const Inner = children as unknown as (props: Record<string, unknown>) => ReactElement;
  const lucideOutput = createElement(Inner, {
    size,
    "aria-hidden": true,
    focusable: false,
  });
  // lucide 输出单个 <svg>，把它的 children (path 等) 复用，外层自己加 SVG 框架
  const lucideProps = lucideOutput.props as { children?: ReactNode };
  const innerChildren: ReactNode = lucideProps.children;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {innerChildren}
    </svg>
  );
}