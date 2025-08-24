"use client"

import { motion } from "framer-motion"
import { Users, FolderOpen, TrendingUp, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Dummy data
const stats = [
  {
    title: "Nya kunder",
    value: "12",
    change: "+3 denna vecka",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Aktiva projekt",
    value: "8",
    change: "2 väntar godkännande",
    icon: FolderOpen,
    color: "text-green-600",
  },
  {
    title: "Intäkter (månad)",
    value: "127 500 kr",
    change: "+15% från förra månaden",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    title: "Avtal skickade",
    value: "5",
    change: "3 väntar svar",
    icon: FileText,
    color: "text-orange-600",
  },
]

const todoItems = [
  {
    id: 1,
    task: "Följ upp offert till Andersson Bygg",
    priority: "hög",
    dueDate: "Idag",
    status: "pending",
  },
  {
    id: 2,
    task: "Skicka avtal till Malmö Fastigheter",
    priority: "medel",
    dueDate: "Imorgon",
    status: "pending",
  },
  {
    id: 3,
    task: "Uppdatera prislista för VVS-tjänster",
    priority: "låg",
    dueDate: "Denna vecka",
    status: "pending",
  },
  {
    id: 4,
    task: "Ring upp Svensson angående projekt",
    priority: "hög",
    dueDate: "Idag",
    status: "completed",
  },
]

const recentActivity = [
  "Nytt projekt skapat för Andersson Bygg",
  "Offert skickad till Malmö Fastigheter",
  "Kund tillagd: Svensson Entreprenad",
  "Avtal signerat av Stockholms Kommun",
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="font-playfair text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Översikt över dina kunder och projekt</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.title} variants={fadeInUp}>
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Placeholder */}
          <motion.div className="lg:col-span-2" initial="initial" animate="animate" variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle>Intäktsutveckling</CardTitle>
                <CardDescription>Månadsvis översikt över intäkter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Graf kommer här</p>
                    <p className="text-sm text-muted-foreground mt-1">Placeholder för intäktsdiagram</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Todo List */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Att göra
                </CardTitle>
                <CardDescription>Dina kommande uppgifter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todoItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      item.status === "completed" ? "bg-muted/50 opacity-60" : "bg-background/50"
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : item.priority === "hög" ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm ${item.status === "completed" ? "line-through" : ""}`}>{item.task}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.priority === "hög"
                              ? "destructive"
                              : item.priority === "medel"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Senaste aktivitet</CardTitle>
              <CardDescription>Vad som hänt i ditt CRM senast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-sm">{activity}</p>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {index === 0 ? "2 min sedan" : index === 1 ? "1 tim sedan" : index === 2 ? "3 tim sedan" : "Igår"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Snabbåtgärder</CardTitle>
              <CardDescription>Vanliga uppgifter du kan göra härifrån</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium">Lägg till kund</h3>
                  <p className="text-sm text-muted-foreground">Skapa en ny kundprofil</p>
                </div>
                <div className="p-4 rounded-lg border bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer">
                  <FolderOpen className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium">Nytt projekt</h3>
                  <p className="text-sm text-muted-foreground">Starta ett nytt kundprojekt</p>
                </div>
                <div className="p-4 rounded-lg border bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer">
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium">Skapa offert</h3>
                  <p className="text-sm text-muted-foreground">Generera en ny offert</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  )
}
