import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import Logo from './logo';
import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
  Nav,
  NavLink,
} from './headerStyles';
// import { HeaderWallet } from './headerWallet';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const RainbowButton = dynamic(
  import('features/wallet/RainbowKit/RainbowButton'),
  { ssr: false },
);

type Route = {
  name: string;
  path: string;
  icon: ReactNode;
};

const routes: Route[] = [
  {
    name: 'DAO',
    path: '/',
    icon: null,
  },
  {
    name: 'Arbitrage',
    path: '/arbitrage',
    icon: null,
  },
];

export const Header: FC = () => {
  const router = useRouter();
  return (
    <HeaderStyle size="full" forwardedAs="header">
      <HeaderLogoStyle>
        <Link href="/">
          <Logo style={{ height: 46, maxWidth: 66 }} />
        </Link>
      </HeaderLogoStyle>

      <Nav>
        {routes.map(({ name, path, icon }) => (
          <NavLink key={path} href={path} $active={router.pathname === path}>
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </Nav>

      <HeaderActionsStyle>
        {/* <HeaderWallet /> */}
        <RainbowButton showBalance={!isMobile} chainSelector />
      </HeaderActionsStyle>
    </HeaderStyle>
  );
};
