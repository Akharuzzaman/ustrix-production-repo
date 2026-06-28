import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * Official USTRIX brand mark — always use this component for visual branding.
 * Renders `/logo-ustrix.png` only. The registered trademark (®) is part of the
 * image; never recreate the wordmark or append typed symbols (®, @R, etc.).
 */
export const USTRIX_LOGO_SRC = '/logo-ustrix.png';

/** Intrinsic pixel dimensions of public/logo-ustrix.png (390×140, includes ®) */
export const USTRIX_LOGO_WIDTH = 390;
export const USTRIX_LOGO_HEIGHT = 140;

type UstrixLogoProps = {
  /** Rendered width on desktop; scales down on smaller screens */
  width?: number;
  priority?: boolean;
  wrapperStyle?: CSSProperties;
};

export default function UstrixLogo({
  width = 220,
  priority = false,
  wrapperStyle,
}: UstrixLogoProps) {
  return (
    <div
      style={{
        width,
        maxWidth: '100%',
        marginInline: 'auto',
        ...wrapperStyle,
      }}
    >
      <Image
        src={USTRIX_LOGO_SRC}
        alt="USTRIX"
        width={USTRIX_LOGO_WIDTH}
        height={USTRIX_LOGO_HEIGHT}
        priority={priority}
        sizes={`(max-width: 640px) 78vw, ${width}px`}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}
