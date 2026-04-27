import {
  RiComputerLine,
  RiLoader2Line,
  RiLogoutBoxLine,
  RiMoonClearLine,
  RiSunLine,
} from '@remixicon/react';
import { Link } from 'react-router';

import { paths } from '@/app/routes';
import { useSignout } from '@/features/auth';
import { useTheme } from '@/features/theme';
import { Button } from './ui/button';
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
  const { isPending, mutate: signout } = useSignout();
  const { setTheme } = useTheme();

  return (
    <header className="mb-15 w-full bg-white shadow dark:bg-neutral-900 dark:text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <h1 className="font-heading text-2xl font-bold">App</h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link to={paths.dashboard}>Dashboard</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Theme</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-50">
                  <li>
                    <NavigationMenuLink
                      render={
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setTheme('light')}
                        >
                          <RiSunLine />
                          Light
                        </Button>
                      }
                    />
                  </li>
                  <li>
                    <NavigationMenuLink
                      render={
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setTheme('dark')}
                        >
                          <RiMoonClearLine />
                          Dark
                        </Button>
                      }
                    />
                  </li>
                  <li>
                    <NavigationMenuLink
                      render={
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setTheme('system')}
                        >
                          <RiComputerLine />
                          System
                        </Button>
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
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                          onClick={() => signout()}
                        >
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
                        </Button>
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
