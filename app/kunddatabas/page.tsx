"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Filter, Users, Calendar, Phone, Mail, Building } from "lucide-react"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
    created: "2024-01-15",
    lastActivity: "2024-01-20",
  },
  {
    id: 2,
    company: "Malmö Fastigheter",
    contact: "Anna Svensson",
    email: "anna@malmofastigheter.se",
    phone: "040-987 65 43",
    created: "2024-01-10",
    lastActivity: "2024-01-18",
  },
  {
    id: 3,
    company: "Stockholms Kommun",
    contact: "Erik Johansson",
    email: "erik.johansson@stockholm.se",
    phone: "08-508 290 00",
    created: "2024-01-08",
    lastActivity: "2024-01-19",
  },
  {
    id: 4,
    company: "Svensson Entreprenad",
    contact: "Maria Svensson",
    email: "maria@svenssonentreprenad.se",
    phone: "031-456 78 90",
    created: "2024-01-05",
    lastActivity: "2024-01-17",
  },
  {
    id: 5,
    company: "Göteborg VVS",
    contact: "Peter Nilsson",
    email: "peter@goteborgvvs.se",
    phone: "031-789 01 23",
    created: "2024-01-03",
    lastActivity: "2024-01-16",
  },
]

export default function KunddatabasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("alla")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "senast-andrade") {
      // Show customers with recent activity (last 3 days)
      const threeDaysAgo = new Date()
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
      return matchesSearch && new Date(customer.lastActivity) > threeDaysAgo
    }

    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("sv-SE")
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-playfair text-3xl font-bold">Kunddatabas</h1>
              <p className="text-muted-foreground mt-2">Hantera alla dina kunder på ett ställe</p>
            </div>
            <Button className="spotlight-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Lägg till kund
            </Button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div className="space-y-4" initial="initial" animate="animate" variants={fadeInUp}>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sök företag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-muted/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button variant={filter === "alla" ? "default" : "outline"} size="sm" onClick={() => setFilter("alla")}>
              Alla
            </Button>
            <Button
              variant={filter === "senast-andrade" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("senast-andrade")}
            >
              Senast ändrade
            </Button>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Visar {filteredCustomers.length} av {customers.length} kunder
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              Tips: klicka på en rad för att öppna Kundkortet
            </div>
          </div>
        </motion.div>

        {/* Customer Table */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          {filteredCustomers.length > 0 ? (
            <Card className="glass">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-card/95 backdrop-blur">
                    <TableRow>
                      <TableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Företag
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Kontakt
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          E-post
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Telefon
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Skapad
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => (window.location.href = `/customers?id=${customer.id}`)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <Building className="h-4 w-4 text-primary" />
                            </div>
                            {customer.company}
                          </div>
                        </TableCell>
                        <TableCell>{customer.contact}</TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${customer.email}`}
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {customer.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`tel:${customer.phone}`}
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {customer.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {formatDate(customer.created)}
                            {new Date(customer.lastActivity) > new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) && (
                              <Badge variant="secondary" className="text-xs">
                                Aktiv
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <Card className="glass">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle>Inga kunder hittades</CardTitle>
                <CardDescription>
                  {searchTerm
                    ? `Inga kunder matchar "${searchTerm}". Prova att ändra din sökning.`
                    : "Du har inga kunder ännu. Lägg till din första kund för att komma igång."}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="spotlight-gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till första kunden
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Pagination */}
        {filteredCustomers.length > 0 && (
          <motion.div
            className="flex items-center justify-between"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <p className="text-sm text-muted-foreground">Sida 1 av 1</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Föregående
              </Button>
              <Button variant="outline" size="sm" disabled>
                Nästa
              </Button>
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Totalt kunder</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nya denna månad</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aktiva projekt</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  )
}
