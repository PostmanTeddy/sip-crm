"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Palette, Monitor, User, Eye, BarChart3, Save, Upload } from "lucide-react"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

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

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [showDashboard, setShowDashboard] = useState(true)
  const [showCustomerCard, setShowCustomerCard] = useState(true)
  const [primaryColor, setPrimaryColor] = useState("#57BB8A")
  const [displayName, setDisplayName] = useState("Teo Gustavson")

  const handleSave = () => {
    toast({
      title: "Sparat",
      description: "Dina inställningar har sparats",
    })
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="font-playfair text-3xl font-bold">Inställningar</h1>
          <p className="text-muted-foreground mt-2">Anpassa systemet efter dina behov</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Theme Settings */}
          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Tema
                </CardTitle>
                <CardDescription>Välj mellan ljust och mörkt tema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Mörkt tema</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktivera mörkt tema för bättre synlighet i svagt ljus
                    </p>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      theme === "light" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="w-full h-16 bg-white rounded border mb-2"></div>
                    <p className="text-sm font-medium">Ljust</p>
                  </div>
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      theme === "dark" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="w-full h-16 bg-gray-900 rounded border mb-2"></div>
                    <p className="text-sm font-medium">Mörkt</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Module Settings */}
          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Moduler
                </CardTitle>
                <CardDescription>Aktivera eller inaktivera funktioner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Visa Dashboard
                    </Label>
                    <p className="text-sm text-muted-foreground">Visa översiktssidan med statistik</p>
                  </div>
                  <Switch checked={showDashboard} onCheckedChange={setShowDashboard} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Visa Kundkort
                    </Label>
                    <p className="text-sm text-muted-foreground">Aktivera kundkortsfunktionen</p>
                  </div>
                  <Switch checked={showCustomerCard} onCheckedChange={setShowCustomerCard} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Branding Settings */}
          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Branding
                </CardTitle>
                <CardDescription>Anpassa utseendet för ditt företag</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primärfärg</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="#57BB8A"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Denna färg används för knappar, länkar och accenter</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Logotyp</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Dra och släpp din logotyp här</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG eller SVG (max 2MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Settings */}
          <motion.div variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil
                </CardTitle>
                <CardDescription>Hantera din profilinformation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Visningsnamn</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ditt namn"
                  />
                  <p className="text-sm text-muted-foreground">Detta namn visas i användargränssnittet</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Profilbild</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Ladda upp bild
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG eller PNG (max 1MB)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Save Button */}
        <motion.div className="flex justify-end" initial="initial" animate="animate" variants={fadeInUp}>
          <Button onClick={handleSave} className="spotlight-gradient">
            <Save className="h-4 w-4 mr-2" />
            Spara inställningar
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  )
}
