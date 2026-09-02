declare module 'shaders/react' {
  import React from 'react';

  export interface DotGridProps {
    id?: string;
    density?: number;
    dotSize?: any;
    twinkle?: number;
    visible?: boolean;
    [key: string]: any;
  }

  export interface ChromaFlowProps {
    id?: string;
    intensity?: number;
    radius?: number;
    visible?: boolean;
    [key: string]: any;
  }

  export interface LinearGradientProps {
    colorA?: string;
    colorB?: string;
    colorSpace?: string;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    maskSource?: string;
    [key: string]: any;
  }

  export interface CursorRipplesProps {
    [key: string]: any;
  }

  export interface FilmGrainProps {
    strength?: number;
    [key: string]: any;
  }

  export interface ShaderProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }

  export const Shader: React.FC<ShaderProps>;
  export const DotGrid: React.FC<DotGridProps>;
  export const ChromaFlow: React.FC<ChromaFlowProps>;
  export const LinearGradient: React.FC<LinearGradientProps>;
  export const CursorRipples: React.FC<CursorRipplesProps>;
  export const FilmGrain: React.FC<FilmGrainProps>;
}
