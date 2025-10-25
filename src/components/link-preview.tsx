import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { encode } from "qss";
import React from "react";
import { cn } from "@/utils/functions";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="hidden image" />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn(
            "text-[var(--color-fg)] font-semibold hover:no-underline",
            className
          )}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>
        <AnimatePresence>
          {isOpen && (
            <HoverCardPrimitive.Portal forceMount>
              <HoverCardPrimitive.Content
                className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
                side="top"
                align="center"
                sideOffset={10}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 550,
                      damping: 30,
                      mass: 1.2,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 48,
                    scale: 0,
                    transition: {
                      duration: 0.15,
                    },
                  }}
                  className="origin-[50%_calc(100%_-_32px)] shadow-xl rounded-xl"
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    className="block transition-colors border border-dashed rounded-lg shadow border-[var(--color-bg-secondary)] hover:border-solid"
                    style={{ fontSize: 0 }}
                  >
                    <img
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  </a>
                </motion.div>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Portal>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Root>
    </>
  );
};
