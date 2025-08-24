"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Package, Wrench, Layers, Search } from "lucide-react"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

// Dummy articles data
const articles = [
  {
    id: 1,
    name: "VVS Installation",
    type: "tjänst",
    unit: "tim",
    purchasePrice: 600,
    salePrice: 850,
  },
  {
    id: 2,
    name: "Rör och kopplingar",
    type: "produkt",
    unit: "st",
    purchasePrice: 80,
    salePrice: 120,
  },
  {
    id: 3,
    name: "Badrumspaket Standard",
    type: "bundle",
    unit: "st",
    purchasePrice: 18000,
    salePrice: 25000,
  },
  {
    id: 4,
    name: "Elinstallation",
    type: "tjänst",
    unit: "tim",
    purchasePrice: 500,
    salePrice: 750,
  },
  {
    id: 5,
    name: "Kakel och klinker",
    type: "produkt",
    unit: "m2",
    purchasePrice: 200,
    salePrice: 350,
  },
]

export default function AdminItemsPage() {
  const [activeTab, setActiveTab] = useState("alla")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newArticle, setNewArticle] = useState({
    name: "",
    type: "produkt",
    unit: "st",
    purchasePrice: "",
    salePrice: "",
  })

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "alla" || article.type === activeTab

    return matchesSearch && matchesTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "produkt":
        return <Package className="h-4 w-4" />
      case "tjänst":
        return <Wrench className="h-4 w-4" />
      case "bundle":
        return <Layers className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "produkt":
        return "default"
      case "tjänst":
        return "secondary"
      case "bundle":
        return "outline"
      default:
        return "default"
    }
  }

  const handleAddArticle = () => {
    // In a real app, this would save to database
    console.log("Adding article:", newArticle)
    setIsDialogOpen(false)
    setNewArticle({
      name: "",
      type: "produkt",
      unit: "st",
      purchasePrice: "",
      salePrice: "",
    })
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
          <div>
            <h1 className="font-playfair text-3xl font-bold">Artiklar</h1>
            <p className="text-muted-foreground mt-2">Hantera produkter, tjänster och bundles</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="spotlight-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Ny artikel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lägg till ny artikel</DialogTitle>
                <DialogDescription>Skapa en ny produkt, tjänst eller bundle</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Namn</Label>
                  <Input
                    id="name"
                    value={newArticle.name}
                    onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                    placeholder="Artikelnamn"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Typ</Label>
                  <Select
                    value={newArticle.type}
                    onValueChange={(value) => setNewArticle({ ...newArticle, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produkt">Produkt</SelectItem>
                      <SelectItem value="tjänst">Tjänst</SelectItem>
                      <SelectItem value="bundle">Bundle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="unit">Enhet</Label>
                  <Select
                    value={newArticle.unit}
                    onValueChange={(value) => setNewArticle({ ...newArticle, unit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="st">st</SelectItem>
                      <SelectItem value="tim">tim</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="m2">m²</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchasePrice">Inköpspris</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={newArticle.purchasePrice}
                      onChange={(e) => setNewArticle({ ...newArticle, purchasePrice: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salePrice">Försäljningspris</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={newArticle.salePrice}
                      onChange={(e) => setNewArticle({ ...newArticle, salePrice: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>
                {newArticle.type === "bundle" && (
                  <div>
                    <Label>Komponenter</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Bundle-komponenter konfigureras efter att artikeln skapats
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Avbryt
                  </Button>
                  <Button onClick={handleAddArticle}>Lägg till</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sök artiklar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-muted/50"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="alla">Alla</TabsTrigger>
              <TabsTrigger value="produkt">Produkter</TabsTrigger>
              <TabsTrigger value="tjänst">Tjänster</TabsTrigger>
              <TabsTrigger value="bundle">Bundles</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredArticles.length > 0 ? (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>
                      {activeTab === "alla"
                        ? "Alla artiklar"
                        : activeTab === "produkt"
                          ? "Produkter"
                          : activeTab === "tjänst"
                            ? "Tjänster"
                            : "Bundles"}
                    </CardTitle>
                    <CardDescription>
                      {filteredArticles.length} {filteredArticles.length === 1 ? "artikel" : "artiklar"} hittades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Namn</TableHead>
                            <TableHead>Typ</TableHead>
                            <TableHead>Enhet</TableHead>
                            <TableHead>Inköpspris</TableHead>
                            <TableHead>Försäljningspris</TableHead>
                            <TableHead>Marginal</TableHead>
                            <TableHead>Åtgärder</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredArticles.map((article) => {
                            const margin = (
                              ((article.salePrice - article.purchasePrice) / article.salePrice) *
                              100
                            ).toFixed(1)
                            return (
                              <TableRow key={article.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    {getTypeIcon(article.type)}
                                    {article.name}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={getTypeColor(article.type) as any}>{article.type}</Badge>
                                </TableCell>
                                <TableCell>{article.unit}</TableCell>
                                <TableCell>{article.purchasePrice.toLocaleString("sv-SE")} kr</TableCell>
                                <TableCell>{article.salePrice.toLocaleString("sv-SE")} kr</TableCell>
                                <TableCell>
                                  <span
                                    className={`font-medium ${Number.parseFloat(margin) > 30 ? "text-green-600" : Number.parseFloat(margin) > 15 ? "text-yellow-600" : "text-red-600"}`}
                                  >
                                    {margin}%
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="glass">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle>Inga artiklar hittades</CardTitle>
                    <CardDescription>
                      {searchTerm
                        ? `Inga artiklar matchar "${searchTerm}"`
                        : `Inga ${activeTab === "alla" ? "artiklar" : activeTab === "produkt" ? "produkter" : activeTab === "tjänst" ? "tjänster" : "bundles"} ännu`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="spotlight-gradient" onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Lägg till första artikeln
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AppLayout>
  )
}
