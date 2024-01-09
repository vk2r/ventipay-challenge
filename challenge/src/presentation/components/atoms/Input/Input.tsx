import { styled } from '~/lib/styled.tsx';
import { ark } from '@ark-ui/react/factory';

// Styled components
import { Props, styles } from './Input.styles.tsx';

const Input = styled<Props>(ark.input, styles);
export default Input;