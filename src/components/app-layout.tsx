
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid,
  CheckSquare,
  Flame,
  Trophy,
  Users,
  Gift,
  Gem,
  User,
  Home,
  Target,
  Rocket,
  Search,
} from 'lucide-react';
import { UserProfile } from './user-profile';
import { Separator } from './ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';


const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/missions', label: 'Missions', icon: Flame },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/rankings', label: 'Rankings', icon: Users },
  { href: '/rewards', label: 'Rewards', icon: Gift },
];

const bottomNavItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/tasks', label: 'Tasks', icon: Target },
    { href: '/missions', label: 'Missions', icon: Rocket },
    { href: '/rankings', label: 'Friends', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();

  const isAuthPage = pathname === '/login' || pathname === '/';

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push('/');
    }
  }, [user, loading, pathname, router, isAuthPage]);


  if (isAuthPage) {
    return <>{children}</>;
  }
  
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Gem className="h-12 w-12 animate-pulse text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return null;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Gem className="h-6 w-6 text-primary" />
              <span className="">System Ascent</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {mainNavItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === item.href && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <UserProfile />
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Gem className="h-6 w-6 text-primary" />
                  <span className="">System Ascent</span>
                </Link>
                {mainNavItems.map(item => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                        pathname === item.href && "bg-muted text-foreground"
                    )}
                    >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <UserProfile />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL!} alt={user.displayName!} data-ai-hint="avatar" />
                    <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 pb-24 md:pb-6">
          {children}
        </main>
        {isMobile && (
            <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
                <div className="flex justify-around h-16 items-center">
                    {bottomNavItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 text-muted-foreground transition-all hover:text-primary",
                                pathname === item.href && "text-primary"
                            )}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}
