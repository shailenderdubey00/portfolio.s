import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  ReactNode,
  HTMLAttributes,
  useImperativeHandle
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, children, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}>
    {children}
  </div>
));
Card.displayName = 'Card';

export interface CardSwapRef {
  swapNext: () => void;
  swapPrev: () => void;
  goToIndex: (index: number) => void;
}

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onActiveIndexChange?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement | null, slot: { x: number; y: number; z: number; zIndex: number }, skew: number) => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });
};

export const CardSwap = forwardRef<CardSwapRef, CardSwapProps>(({
  width = 480,
  height = 320,
  cardDistance = 45,
  verticalDistance = 40,
  delay = 5000,
  pauseOnHover = true,
  onCardClick,
  onActiveIndexChange,
  skewAmount = 4,
  easing = 'elastic',
  children
}, forwardedRef) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.8,
          durMove: 1.8,
          durReturn: 1.8,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const isAnimating = useRef(false);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<any>();
  const container = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const swapNext = useCallback(() => {
    if (order.current.length < 2 || isAnimating.current) return;
    isAnimating.current = true;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    if (!elFront) {
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        order.current = [...rest, front];
        onActiveIndexChange?.(order.current[0]);
      }
    });
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=450',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.12}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        if (elFront) {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        }
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );
  }, [cardDistance, verticalDistance, config, refs, onActiveIndexChange]);

  const swapPrev = useCallback(() => {
    if (order.current.length < 2 || isAnimating.current) return;
    isAnimating.current = true;

    const total = refs.length;
    const lastIdx = order.current[total - 1];
    const rest = order.current.slice(0, total - 1);
    const elBack = refs[lastIdx].current;
    if (!elBack) {
      isAnimating.current = false;
      return;
    }

    const frontSlot = makeSlot(0, cardDistance, verticalDistance, total);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        order.current = [lastIdx, ...rest];
        onActiveIndexChange?.(order.current[0]);
      }
    });
    tlRef.current = tl;

    // Shift others backward
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, total);
      tl.set(el, { zIndex: slot.zIndex });
      tl.to(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        duration: config.durMove * 0.8,
        ease: config.ease
      }, 0);
    });

    // Bring back card to front
    tl.set(elBack, { zIndex: total + 2 }, 0);
    tl.fromTo(
      elBack,
      { y: '+=450', x: frontSlot.x },
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      0.1
    );
  }, [cardDistance, verticalDistance, config, refs, onActiveIndexChange]);

  const goToIndex = useCallback((targetIndex: number) => {
    if (isAnimating.current || order.current[0] === targetIndex) return;
    swapNext();
  }, [swapNext]);

  useImperativeHandle(forwardedRef, () => ({
    swapNext,
    swapPrev,
    goToIndex
  }));

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (delay > 0) {
      intervalRef.current = window.setInterval(swapNext, delay);
    }
  }, [delay, swapNext]);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
    onActiveIndexChange?.(order.current[0]);

    resetInterval();

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        resetInterval();
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs, resetInterval, onActiveIndexChange]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if project section or viewport is active
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isInView) return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        swapNext();
        resetInterval();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        swapPrev();
        resetInterval();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swapNext, swapPrev, resetInterval]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold of 40px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        swapNext(); // Swipe Left -> Next Project Folder
      } else {
        swapPrev(); // Swipe Right -> Previous Project Folder
      }
      resetInterval();
    } else if (Math.abs(diffY) > 50) {
      if (diffY < 0) swapNext();
      else swapPrev();
      resetInterval();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        swapNext();
      } else {
        swapPrev();
      }
      resetInterval();
    }
    mouseStartX.current = null;
  };

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<any>, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child as any).props.style ?? {}) },
          onClick: (e: any) => {
            (child as any).props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div
      ref={container}
      className="card-swap-container"
      style={{ width, height }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
