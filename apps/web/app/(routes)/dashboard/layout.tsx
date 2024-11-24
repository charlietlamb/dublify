import DashboardHeader from '@dubble/design-system/components/dashboard/header/dashboard-header'
import DashboardSidebar from '@dubble/design-system/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@dubble/design-system/components/providers/session-provider'
import { SidebarProvider } from '@dubble/design-system/components/ui/sidebar'
import useAuth from '@dubble/design-system/hooks/use-auth'
import useIsUser from '@dubble/design-system/hooks/use-is-user'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useAuth()
  useIsUser(user)
  return (
    <SidebarProvider className="flex w-full flex-grow">
      <SessionProvider user={user}>
        <DashboardSidebar />
        <div className="w-full max-h-screen flex flex-col overflow-hidden bg-sidebar">
          <div className="w-full flex-grow flex flex-col md:border-l border-border md:rounded-l-lg overflow-hidden">
            <DashboardHeader />
            <div className="flex flex-col flex-grow overflow-hidden bg-background">
              {children}
            </div>
          </div>
        </div>
      </SessionProvider>
    </SidebarProvider>
  )
}
