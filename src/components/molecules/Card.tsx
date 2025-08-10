import React, { useState, useRef, useEffect } from 'react';
import '../../styles/card-animations.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  title?: string;
}

const Card = ({
  children,
  className = '',
  backgroundImage = '/images/card01.png',
  title,
}: CardProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsRotated(!isRotated);
    }
  };

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = backgroundImage;
    }
  }, [backgroundImage]);

  return (
    <div className={`card ${className}`} ref={cardRef}>
      <div
        className={`card-content ${isRotated ? 'rotated' : ''} ${isLoaded ? 'loaded' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={title || 'カードをクリックして回転'}
        aria-pressed={isRotated}
        style={
          {
            '--background-image': `url(${backgroundImage})`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Card;

