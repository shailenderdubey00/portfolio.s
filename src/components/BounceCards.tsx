import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export interface BounceCardItem {
  id: string | number;
  category: string;
  icon?: string;
  items: string[];
}

export interface BounceCardsProps {
  className?: string;
  items?: BounceCardItem[];
  images?: string[];
  containerWidth?: number | string;
  containerHeight?: number | string;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  children?: ReactNode[];
}

export const BounceCards: React.FC<BounceCardsProps> = ({
  className = '',
  items = [],
  images = [],
  containerWidth = 600,
  containerHeight = 380,
  animationDelay = 0.3,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.75)',
  transformStyles = [
    'rotate(-12deg) translate(-220px, 10px)',
    'rotate(-6deg) translate(-110px, -10px)',
    'rotate(0deg) translate(0px, 0px)',
    'rotate(6deg) translate(110px, -10px)',
    'rotate(12deg) translate(220px, 10px)'
  ],
  enableHover = true,
  children
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cardCount = children?.length || items.length || images.length || 0;

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px(?:,\s*([-0-9.]+)px)?\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const currentY = match[2] ? match[2] : '0';
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px, ${currentY}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    for (let i = 0; i < cardCount; i++) {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: `${noRotationTransform} scale(1.08)`,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -140 : 140;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.04;

        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    }
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    for (let i = 0; i < cardCount; i++) {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(target, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    }
  };

  return (
    <div
      className={`bounce-cards-container ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {items.length > 0
        ? items.map((skillGroup, idx) => (
            <div
              key={skillGroup.id || idx}
              className={`bounce-card bounce-card-${idx}`}
              style={{
                transform: transformStyles[idx] ?? 'none'
              }}
              onMouseEnter={() => pushSiblings(idx)}
              onMouseLeave={resetSiblings}
            >
              <div className="bounce-card-header">
                <span className="bounce-card-cat-badge">0{idx + 1}</span>
                <span className="bounce-card-icon">{skillGroup.icon || '⚡'}</span>
              </div>
              <h3 className="bounce-card-title">{skillGroup.category}</h3>
              <ul className="bounce-card-list">
                {skillGroup.items.map((it, i) => (
                  <li key={i} className="bounce-card-item">
                    <span className="bounce-card-bullet">&bull;</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))
        : images.map((src, idx) => (
            <div
              key={idx}
              className={`bounce-card bounce-card-${idx}`}
              style={{
                transform: transformStyles[idx] ?? 'none'
              }}
              onMouseEnter={() => pushSiblings(idx)}
              onMouseLeave={resetSiblings}
            >
              <img
                src={src}
                alt={`card-${idx}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
          ))}
    </div>
  );
};

export default BounceCards;
