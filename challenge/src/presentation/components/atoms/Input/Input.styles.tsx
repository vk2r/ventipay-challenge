import { HTMLArkProps } from '@ark-ui/react/factory';
import { tv, type VariantProps } from 'tailwind-variants';

type InputVariantProps = VariantProps<typeof styles>;
export type Props = InputVariantProps & HTMLArkProps<'input'>;

export const styles = tv({
  base: 'input',
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      '2xs': 'input--size_2xs',
      xs: 'input--size_xs',
      sm: 'input--size_sm',
      md: 'input--size_md',
      lg: 'input--size_lg',
      xl: 'input--size_xl',
      '2xl': 'input--size_2xl',
    },
  },
});
