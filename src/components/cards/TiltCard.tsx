import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../lib/motion';

interface TiltCardProps {
  children: React.ReactNode;
  isFeatured?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  isFeatured = false,
  className = '',
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFeatured || prefersReducedMotion || ('ontouchstart' in window)) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 6 degrees tilt
    const maxDegree = 6;
    const rotX = ((y - centerY) / centerY) * -maxDegree;
    const rotY = ((x - centerX) / centerX) * maxDegree;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const canTilt = isFeatured && !prefersReducedMotion && !('ontouchstart' in window);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`group transition-all duration-200 ease-out will-change-transform ${
        isHovered ? '-translate-y-1 shadow-lg' : 'translate-y-0 shadow-sm'
      } ${className}`}
      style={{
        perspective: canTilt ? '1000px' : undefined,
        transformStyle: canTilt ? 'preserve-3d' : undefined,
        transform: canTilt && isHovered
          ? `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
          : undefined,
        transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
      }}
    >
      {children}
    </div>
  );
}
