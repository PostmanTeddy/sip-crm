"use client"

import { motion } from "framer-motion"
import { FileText, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export default function AdminPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="font-playfair text-3xl font-bold">Admin</h1>
          <p className="text-muted-foreground mt-2">Hantera artiklar och systeminställningar</p>
        </motion.div>

        {/* Admin Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="glass h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Artiklar</CardTitle>
                    <CardDescription>Hantera produkter, tjänster och bundles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Lägg till och redigera artiklar som du använder i dina projekt. Skapa bundles för att kombinera flera
                  produkter och tjänster.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">23</span> artiklar totalt
                  </div>
                  <Button asChild className="spotlight-gradient">
                    <Link href="/admin/items">
                      Hantera artiklar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="glass h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Inställningar</CardTitle>
                    <CardDescription>Anpassa systemet efter dina behov</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Konfigurera tema, moduler och branding. Hantera din profil och systeminställningar.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Ljust</span> tema aktivt
                  </div>
                  <Button asChild variant="outline">
                    <Link href="/admin/settings">
                      Öppna inställningar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Produkter</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Tjänster</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Bundles</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Totalt</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
