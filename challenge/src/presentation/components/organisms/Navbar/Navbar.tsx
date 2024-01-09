import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Components
import Link from '../../atoms/Link';
import Avatar from '../../atoms/Avatar';

// Definitions
import { LinkType, Props } from './Nabvar.defs.ts';

// Constants
const navbar: LinkType[] = [
  {
    href: '/users',
    target: '_self',
    label: 'Users',
    active: false,
  },
  {
    href: '/register',
    target: '_self',
    label: 'Register',
    active: false,
  }
];

const Navbar = (props: Props) => {
  // Props
  const { name, loggedIn, onLogout } = props;

  // Hooks
  const location = useLocation();

  // States
  const [navbarLinks, setNavbarLinks] = useState<LinkType[]>(navbar);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  // Methods
  const methods = {
    on: {
      userMenuBlur: () => setUserMenuOpened(false),
      mobileMenuBlur: () => setMobileMenuOpened(false),
      logout: () => onLogout?.(),
    },
    toggle: {
      userMenu: () => setUserMenuOpened(!userMenuOpened),
      mobileMenu: () => setMobileMenuOpened(!mobileMenuOpened),
    },
    calculate: {
      activeLink: () => {
        const current = location.pathname;
        const update = navbarLinks.map(link => link.href === current
          ? { ...link, active: true }
          : { ...link, active: false }
        );
        setNavbarLinks(update);
      },
    }
  };

  // On location change
  useEffect(() => {
    methods.calculate.activeLink();
    methods.on.mobileMenuBlur();
    methods.on.userMenuBlur();
  }, [location]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu" aria-expanded="false" onClick={methods.toggle.mobileMenu}>
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" target="_self">
                <img className="h-8 w-auto" src="https://ventipay.com/assets/images/iso.svg" alt="VentiPay"/>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navbarLinks.map((link, key) => {
                  const { href, target, label, active } = link;
                  const className = active
                    ? 'bg-indigo-500 text-white rounded-md px-3 py-2 text-sm font-medium'
                    : 'text-gray-300 hover:bg-black hover:text-white rounded-md px-3 py-2 text-sm font-medium';
                  return (
                    <Link
                      key={key}
                      href={href}
                      target={target}
                      className={className}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button type="button"
                  className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                  onClick={methods.toggle.userMenu}>
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Avatar name={name}/>
                </button>
              </div>

              {userMenuOpened && (<div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                {loggedIn && (
                  <>
                    <Link href="/profile" target="_self" className="block px-4 py-2 text-sm text-gray-700 bg-white">
                      Your Profile
                    </Link>
                    <button
                      type="button"
                      onClick={methods.on.logout}
                      className="block px-4 py-2 text-sm text-gray-700 bg-white" role="menuitem" tabIndex={-1}>
                      Sign out
                    </button>
                  </>
                )}
                {!loggedIn && (
                  <Link href="/login" target="_self" className="block px-4 py-2 text-sm text-gray-700 bg-white">
                    Sign in
                  </Link>
                )}

              </div>)}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpened && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navbarLinks.map((link, key) => {
              const { href, target, label, active } = link;
              const className = active
                ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium';
              return (
                <Link
                  key={key}
                  href={href}
                  target={target}
                  className={className}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;