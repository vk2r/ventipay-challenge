import { ReactNode } from 'react';

// Definitions
export type Props = {
  children?: ReactNode;
};

const Background = (props: Props) => {
  // Props
  const { children } = props;

  return (
    <div
      className="absolute top-0 z-[-2] xs:h-screen xs:w-screen min-h-full min-w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      {children}
    </div>
  );
};

export default Background;