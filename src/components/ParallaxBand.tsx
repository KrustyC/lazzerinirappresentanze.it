import { classNames } from "@/lib/utils/classNames";

interface ParallaxBandProps {
  /** A path under `public/`. */
  src: string;
  className?: string;
}

/**
 * A decorative full-bleed photo with a fixed background. A CSS background on
 * purpose: `background-attachment: fixed` is the whole effect and
 * `next/image` cannot express it — so these originals ship unoptimised
 * until the redesign replaces them.
 */
export const ParallaxBand: React.FC<ParallaxBandProps> = ({
  src,
  className,
}) => (
  <div
    aria-hidden
    className={classNames("parallax-band h-[500px] w-full bg-black", className)}
    style={{ backgroundImage: `url(${src})` }}
  />
);
