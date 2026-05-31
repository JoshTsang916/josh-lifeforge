import type { CSSProperties } from "react";

// 四角火花星 —— 中心飽滿、四角拉尖、邊緣內凹（twinkle / sparkle 形狀）。
// 不是圓圈、不是 lucide icon，是自己畫的火星。發光靠 CSS drop-shadow（外層給）。
// viewBox -50 -50 100 100，中心在原點，方便等比縮放與旋轉。
type Props = {
  size: number | string;
  color: string;
  /** 0~1，中心亮點不透明度 */
  coreOpacity?: number;
  className?: string;
  style?: CSSProperties;
};

export function SparkStar({ size, color, coreOpacity = 0.9, className, style }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* 火花本體：四尖角 + 內凹腰身（用二次貝茲把邊收向中心）*/}
      <path
        d="M0,-48 Q6,-6 48,0 Q6,6 0,48 Q-6,6 -48,0 Q-6,-6 0,-48 Z"
        fill={color}
      />
      {/* 中心熾亮點 */}
      <circle cx="0" cy="0" r="7" fill="#FFF3E0" opacity={coreOpacity} />
    </svg>
  );
}
