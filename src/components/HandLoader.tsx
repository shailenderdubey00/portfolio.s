import React from 'react';
import './HandLoader.css';

export interface HandLoaderProps {
  skinColor?: string;
  tapSpeed?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const HandLoader: React.FC<HandLoaderProps> = ({
  skinColor = '#E4C560',
  tapSpeed = '0.6s',
  className = '',
  style
}) => {
  return (
    <div
      className={`🤚 ${className}`}
      style={{
        '--skin-color': skinColor,
        '--tap-speed': tapSpeed,
        ...style
      } as React.CSSProperties}
    >
      <div className="👉"></div>
      <div className="👉"></div>
      <div className="👉"></div>
      <div className="👉"></div>
      <div className="🌴"></div>
      <div className="👍"></div>
    </div>
  );
};

export default HandLoader;
