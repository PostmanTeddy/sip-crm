"use client"

import type * as React from "react"
import { ChevronLeft, Home, Users, Database, Settings, FileText, Cog } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Kundkort",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Kunddatabas",
    url: "/kunddatabas",
    icon: Database,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
    items: [
      {
        title: "Artiklar",
        url: "/admin/items",
        icon: FileText,
      },
      {
        title: "Inställningar",
        url: "/admin/settings",
        icon: Cog,
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar className="glass border-r border-sidebar-border" {...props}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            S
          </div>
          <span className="font-playfair font-bold text-lg">SIP CRM</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url} className="w-full justify-start">
                <Link href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.items && (
                <SidebarMenu className="ml-4 mt-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild isActive={pathname === subItem.url} size="sm">
                        <Link href={subItem.url}>
                          <subItem.icon className="h-3 w-3" />
                          <span className="text-sm">{subItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              )}
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full justify-start">
              <Link href="/site">
                <ChevronLeft className="h-4 w-4" />
                <span>Till webbsida</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
