import { styled } from '../../../../lib/styled.tsx';
import { ark } from '@ark-ui/react/factory';

// Styled components
import { Props, styles } from './Button.styles.tsx';

const Button = styled<Props>(ark.button, styles);
export default Button;
