import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { Link as LinkRouter } from 'react-router-dom';

// Definitions
export type Props = {
  href: string;
  target: HTMLAttributeAnchorTarget;
  rel?: string;
  className?: string;
  children?: ReactNode;
};

const Link = (props: Props) => {
  // Props
  const { href, target, rel, className, children } = props;
  return (
    <LinkRouter
      to={href}
      target={target}
      rel={rel}
      className={`no-underline ${className}`}>
      {children}
    </LinkRouter>
  );
};

export default Link;