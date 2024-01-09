import { HTMLAttributeAnchorTarget } from 'react';

export type Props = {
  name?: string;
  loggedIn?: boolean;
  onLogout?: () => void;
};

export type LinkType = {
  href: string;
  target: HTMLAttributeAnchorTarget;
  label: string;
  active?: boolean;
}