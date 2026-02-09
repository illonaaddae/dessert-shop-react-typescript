import { createElement, HTMLAttributes, ReactNode } from 'react';
import styles from './Typography.module.css';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'price' | 'label';
type TypographyColor = 'primary' | 'secondary' | 'accent' | 'error' | 'inherit';
type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  color?: TypographyColor;
  weight?: TypographyWeight;
  children: ReactNode;
}

/**
 * Reusable Typography component for consistent text styling
 * Allows semantic HTML override while maintaining visual styling
 */
export const Typography = ({
  variant = 'body',
  as,
  color = 'inherit',
  weight,
  className = '',
  children,
  ...rest
}: TypographyProps) => {
  // Map variants to default semantic HTML elements
  const defaultElement: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'span',
    price: 'p',
    label: 'span',
  };

  const element = as || defaultElement[variant];

  const typographyClasses = [
    styles.typography,
    styles[variant],
    styles[`color-${color}`],
    weight && styles[`weight-${weight}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createElement(
    element,
    {
      className: typographyClasses,
      ...rest,
    },
    children
  );
};

Typography.displayName = 'Typography';
