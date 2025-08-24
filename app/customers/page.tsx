"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Building,
  User,
  Mail,
  Phone,
  Edit,
  Copy,
  Plus,
  Save,
  ChevronDown,
  Trash2,
  ArrowLeft,
  FileText,
  MessageSquare,
} from "lucide-react"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

// Dummy customer data
const customers = [
  {
    id: 1,
    company: "Andersson Bygg AB",
    contact: "Lars Andersson",
    email: "lars@anderssonbygg.se",
    phone: "08-123 45 67",
    notes: "Stor kund med många projekt. Föredrar att få offerter via e-post.",
  },
  {
    id: 2,
    company: "Malmö Fastigheter",
    contact: "Anna Svensson",
    email: "anna@malmofastigheter.se",
    phone: "040-987 65 43",
    notes: "Arbetar främst med renoveringar av äldre fastigheter.",
  },
  {
    id: 3,
    company: "Stockholms Kommun",
    contact: "Erik Johansson",
    email: "erik.johansson@stockholm.se",
    phone: "08-508 290 00",
    notes: "Offentlig sektor, längre beslutsprocesser.",
  },
]

// Dummy project items
const initialProjectItems = [
  {
    id: 1,
    article: "VVS Installation",
    type: "tjänst",
    unit: "tim",
    quantity: 8,
    price: 850,
    total: 6800,
  },
  {
    id: 2,
    article: "Rör och kopplingar",
    type: "produkt",
    unit: "st",
    quantity: 15,
    price: 120,
    total: 1800,
  },
  {
    id: 3,
    article: "Badrumspaket Standard",
    type: "bundle",
    unit: "st",
    quantity: 1,
    price: 25000,
    total: 25000,
  },
]

export default function CustomersPage() {
  const searchParams = useSearchParams()
  const customerId = searchParams.get("id")
  const [activeCustomer, setActiveCustomer] = useState(customers[0])
  const [projectItems, setProjectItems] = useState(initialProjectItems)
  const [customerNotes, setCustomerNotes] = useState("")

  useEffect(() => {
    if (customerId) {
      const customer = customers.find((c) => c.id === Number.parseInt(customerId))
      if (customer) {
        setActiveCustomer(customer)
        setCustomerNotes(customer.notes)
      }
    }
  }, [customerId])

  const subtotal = projectItems.reduce((sum, item) => sum + item.total, 0)
  const vat = subtotal * 0.25
  const total = subtotal + vat

  const addProjectItem = () => {
    const newItem = {
      id: Date.now(),
      article: "Ny artikel",
      type: "produkt",
      unit: "st",
      quantity: 1,
      price: 0,
      total: 0,
    }
    setProjectItems([...projectItems, newItem])
  }

  const updateProjectItem = (id: number, field: string, value: any) => {
    setProjectItems(
      projectItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "price") {
            updated.total = updated.quantity * updated.price
          }
          return updated
        }
        return item
      }),
    )
  }

  const removeProjectItem = (id: number) => {
    setProjectItems(projectItems.filter((item) => item.id !== id))
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/kunddatabas")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Byt kund
            </Button>
            <div>
              <h1 className="font-playfair text-2xl font-bold">{activeCustomer.company}</h1>
              <p className="text-muted-foreground">Kundkort och projekthantering</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customer Info */}
          <motion.div className="lg:col-span-1" initial="initial" animate="animate" variants={fadeInUp}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Kund
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Företag</Label>
                    <p className="text-sm mt-1">{activeCustomer.company}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Kontakt</Label>
                    <p className="text-sm mt-1 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {activeCustomer.contact}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">E-post</Label>
                    <p className="text-sm mt-1 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${activeCustomer.email}`} className="text-primary hover:underline">
                        {activeCustomer.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Telefon</Label>
                    <p className="text-sm mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${activeCustomer.phone}`} className="text-primary hover:underline">
                        {activeCustomer.phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Anteckningar</Label>
                    <Textarea
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Lägg till anteckningar om kunden..."
                      className="mt-1 min-h-[80px]"
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Redigera
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Copy className="h-4 w-4 mr-2" />
                    Kopiera
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Tabs */}
          <motion.div className="lg:col-span-2" initial="initial" animate="animate" variants={fadeInUp}>
            <Tabs defaultValue="projekt" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="projekt" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Projekt
                </TabsTrigger>
                <TabsTrigger value="anteckningar" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Anteckningar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projekt" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Projektrader</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={addProjectItem}>
                          <Plus className="h-4 w-4 mr-2" />
                          Lägg till rad
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Lägg till bundle
                        </Button>
                        <Button size="sm" variant="outline">
                          <Save className="h-4 w-4 mr-2" />
                          Spara
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Artikel</TableHead>
                            <TableHead>Typ</TableHead>
                            <TableHead>Enhet</TableHead>
                            <TableHead>Antal</TableHead>
                            <TableHead>Pris</TableHead>
                            <TableHead>Summa</TableHead>
                            <TableHead>Åtgärder</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projectItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Input
                                  value={item.article}
                                  onChange={(e) => updateProjectItem(item.id, "article", e.target.value)}
                                  className="min-w-[150px]"
                                />
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    item.type === "produkt"
                                      ? "default"
                                      : item.type === "tjänst"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {item.type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={item.unit}
                                  onValueChange={(value) => updateProjectItem(item.id, "unit", value)}
                                >
                                  <SelectTrigger className="w-20">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="st">st</SelectItem>
                                    <SelectItem value="tim">tim</SelectItem>
                                    <SelectItem value="m">m</SelectItem>
                                    <SelectItem value="m2">m²</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateProjectItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)
                                  }
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) =>
                                    updateProjectItem(item.id, "price", Number.parseFloat(e.target.value) || 0)
                                  }
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{item.total.toLocaleString("sv-SE")} kr</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeProjectItem(item.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <Separator className="my-4" />

                    {/* Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delsumma:</span>
                        <span>{subtotal.toLocaleString("sv-SE")} kr</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Moms (25%):</span>
                        <span>{vat.toLocaleString("sv-SE")} kr</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Totalt:</span>
                        <span>{total.toLocaleString("sv-SE")} kr</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="spotlight-gradient">
                            Generera dokument
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Sponsring
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Offertkalkyl
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Avtal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="anteckningar">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Projektanteckningar</CardTitle>
                    <CardDescription>Anteckningar specifikt för detta projekt</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Lägg till projektanteckningar här..."
                      className="min-h-[200px]"
                      defaultValue="Projekt startade 2024-01-15. Kunden vill ha installation klar före sommarsemester. Viktigt att koordinera med andra entreprenörer på plats."
                    />
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Spara anteckningar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}
