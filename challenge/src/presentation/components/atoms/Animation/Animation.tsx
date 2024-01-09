import { CSSProperties } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

// Definitions
export type Props = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: CSSProperties;
};

const Animation = (props: Props) => {
  // Props
  const { src, loop, autoplay, className, style } = props;
  return (
    <Player
      src={src}
      loop={loop}
      autoplay={autoplay}
      style={style}
      className={className}
    />
  );
};

export default Animation;