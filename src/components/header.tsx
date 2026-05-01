import {
  RiComputerLine,
  RiLoader2Line,
  RiLogoutBoxLine,
  RiMoonClearLine,
  RiSunLine,
} from '@remixicon/react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { paths } from '@/app/routes';
import { useSignout } from '@/features/auth/hooks';
import { useTheme } from '@/features/theme';
import NavMenuButton from './navmenu-button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export default function Header() {
  const { setTheme } = useTheme();
  const { isPending, mutate: signout } = useSignout();

  const handleSignout = () => {
    signout(undefined, { onSuccess: () => toast.success('Successfully signed out!') });
  };

  return (
    <header className="mb-15 w-full bg-white shadow dark:bg-neutral-900 dark:text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <h1 className="font-heading text-2xl font-bold">App</h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to={paths.home}>Dashboard</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to={paths.bugReport}>Report a bug</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Theme</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-50">
                  <li>
                    <NavigationMenuLink
                      render={
                        <NavMenuButton onClick={() => setTheme('light')}>
                          <RiSunLine />
                          Light
                        </NavMenuButton>
                      }
                    />
                  </li>
                  <li>
                    <NavigationMenuLink
                      render={
                        <NavMenuButton onClick={() => setTheme('dark')}>
                          <RiMoonClearLine />
                          Dark
                        </NavMenuButton>
                      }
                    />
                  </li>
                  <li>
                    <NavigationMenuLink
                      render={
                        <NavMenuButton onClick={() => setTheme('system')}>
                          <RiComputerLine />
                          System
                        </NavMenuButton>
                      }
                    />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-50">
                  <li>
                    <NavigationMenuLink
                      render={
                        <NavMenuButton onClick={handleSignout} disabled={isPending}>
                          {isPending ? (
                            <>
                              <RiLoader2Line className="animate-spin" data-icon="inline-start" />
                              Signing out...
                            </>
                          ) : (
                            <>
                              <RiLogoutBoxLine data-icon="inline-start" />
                              Sign Out
                            </>
                          )}
                        </NavMenuButton>
                      }
                    />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
