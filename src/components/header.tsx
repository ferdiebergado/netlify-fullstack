import { RiLoader2Line, RiLogoutBoxLine } from '@remixicon/react';
import { Link } from 'react-router';

import { paths } from '@/app/routes';
import { useSignout } from '@/features/auth';
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

  const handleSignout = () => signout();

  return (
    <header className="mb-15 w-full bg-white shadow">
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
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-50">
                  <li>
                    <NavigationMenuLink
                      render={
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                          onClick={handleSignout}
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
