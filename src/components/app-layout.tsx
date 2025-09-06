'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  CheckSquare,
  Flame,
  Trophy,
  Users,
  Gift,
  Gem,
} from 'lucide-react';
import { UserProfile } from './user-profile';
import { DashboardHeader } from './dashboard-header';
import { Separator } from './ui/separator';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/missions', label: 'Missions', icon: Flame },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/rankings', label: 'Rankings', icon: Users },
  { href: '/rewards', label: 'Rewards', icon: Gift },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Gem className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">System Ascent</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <Separator />
        <SidebarFooter>
          <UserProfile />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
