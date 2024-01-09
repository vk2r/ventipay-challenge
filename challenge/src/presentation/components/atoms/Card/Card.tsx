import { ReactNode } from 'react';

// Definitions
export type Props = {
  className?: string;
  children: ReactNode;
};

const Card = (props: Props) => {
  // Props
  const { children, className } = props;
  return (
    <div
      className={`
      select-none 
      border border-border
      w-full min-w-max p-6 sm:p-6 md:p-8 rounded-lg bg-slate-900
      ${className}`}>
      {children}
    </div>
  );
};

export default Card;