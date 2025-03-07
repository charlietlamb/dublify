'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@ff/design-system/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@ff/design-system/components/ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@ff/design-system/components/ui/sidebar'
import useUser from '@ff/design-system/hooks/use-user'
import { ChevronsUpDown } from 'lucide-react'
import DashboardSidebarFooterMenu from './dashboard-sidebar-footer-menu'
import DashboardSidebarThemeToggle from '../toggle/dashboard-sidebar-theme-toggle'

export default function DashboardSidebarFooter() {
  const user = useUser()
  if (!user) return null
  return (
    <SidebarFooter>
      <DashboardSidebarThemeToggle closed={true} />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user?.name ?? ''}
                    className="object-cover mx-auto my-auto"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.[0] ?? 'CN'}
                    {user?.name?.split(' ')[1]?.[0] ?? ''}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DashboardSidebarFooterMenu />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
