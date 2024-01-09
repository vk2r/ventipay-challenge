// Styled components
import { Props, AvatarStyle } from './Avatar.styles';

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Avatar = (props: Props) => {
  // Props
  const { name, src } = props;

  // Methods
  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((part) => part[0])
      .splice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <AvatarStyle.Container>
      <AvatarStyle.Fallback className="ring-offset-2 p-2">
        {getInitials(name) || <UserIcon/>}
      </AvatarStyle.Fallback>
      <AvatarStyle.Image src={src} alt={name}/>
    </AvatarStyle.Container>
  );
};

export default Avatar;