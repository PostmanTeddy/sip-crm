"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check, Users, Database, FileText, Sparkles, Building, Wrench, Target, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function SitePage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="font-playfair font-bold text-xl">SIP CRM</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#hem" className="text-sm font-medium hover:text-primary transition-colors">
              Hem
            </a>
            <a href="#funktioner" className="text-sm font-medium hover:text-primary transition-colors">
              Funktioner
            </a>
            <a href="#priser" className="text-sm font-medium hover:text-primary transition-colors">
              Priser
            </a>
            <a href="#sa-funkar-det" className="text-sm font-medium hover:text-primary transition-colors">
              Så funkar det
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#kontakt" className="text-sm font-medium hover:text-primary transition-colors">
              Kontakt
            </a>
          </nav>

          <Button asChild className="spotlight-gradient">
            <Link href="/customers">Testa nu</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hem" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 spotlight-gradient-subtle"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6" variants={fadeInUp}>
              Sälj smartare med ett minimalistiskt CRM
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-muted-foreground mb-8" variants={fadeInUp}>
              Kundkort, projekt och dokument – klart på minuter.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
              <Button asChild size="lg" className="spotlight-gradient">
                <Link href="/customers">
                  Gå till Kundkort
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/kunddatabas">Se Kunddatabas</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funktioner" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Funktioner som förenklar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Allt du behöver för att hantera kunder och projekt på ett smart sätt
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="glass h-full">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Kundkort + Projekt</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Lägg till produkter, tjänster och bundles. Ändra antal och pris direkt i projektet.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass h-full">
                <CardHeader>
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Kunddatabas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Snabb lista över alla kunder. Klicka på en rad för att öppna kundkortet direkt.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass h-full">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Dokumentflöde</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Generera sponsring, offertkalkyl och avtal direkt från dina projektmallar.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass h-full">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Minimal design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Svenskt UI med luftig design. Fokusera på arbetet, inte på systemet.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="priser" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Enkla priser</h2>
            <p className="text-lg text-muted-foreground">Välj den plan som passar ditt företag</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="glass relative">
                <CardHeader>
                  <CardTitle>Start</CardTitle>
                  <div className="text-3xl font-bold">
                    0 kr<span className="text-sm font-normal text-muted-foreground">/månad</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Upp till 10 kunder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Grundläggande funktioner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">E-postsupport</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/customers">Prenumerera nu</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass relative border-primary">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Populär
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">
                    199 kr<span className="text-sm font-normal text-muted-foreground">/månad</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Obegränsat antal kunder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Alla funktioner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Prioriterad support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Anpassade mallar</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full spotlight-gradient">
                    <Link href="/customers">Prenumerera nu</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass relative">
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <div className="text-3xl font-bold">
                    499 kr<span className="text-sm font-normal text-muted-foreground">/månad</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Allt i Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Teamsamarbete</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">Avancerad rapportering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">API-åtkomst</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/customers">Prenumerera nu</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="sa-funkar-det" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Så funkar det</h2>
            <p className="text-lg text-muted-foreground">Tre enkla steg till ditt första projekt</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Välj kund</h3>
              <p className="text-muted-foreground">Sök eller lägg till en ny kund i databasen</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Bygg projektet</h3>
              <p className="text-muted-foreground">Lägg till produkter, tjänster och bundles</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Skicka dokument</h3>
              <p className="text-muted-foreground">Generera offert, avtal eller sponsring</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Perfekt för</h2>
            <p className="text-lg text-muted-foreground">Olika branscher, samma smarta lösning</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="glass text-center h-full">
                <CardHeader>
                  <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Fastighetsägare</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Hantera hyresgäster och underhållsprojekt</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass text-center h-full">
                <CardHeader>
                  <Wrench className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Installatörer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Offerter och projektuppföljning</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass text-center h-full">
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Säljteam</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Kunduppföljning och försäljningsprocesser</CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="glass text-center h-full">
                <CardHeader>
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Kommuner & föreningar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Medlemshantering och projektadministration</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Email Capture */}
      <section id="kontakt" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Vill du få mallar och smarta tips?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Få de bästa tipsen för att optimera din försäljningsprocess
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Din e-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button className="spotlight-gradient">Skicka</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Vanliga frågor</h2>
            <p className="text-lg text-muted-foreground">Svar på det du undrar över</p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="glass border rounded-lg px-6">
                <AccordionTrigger>Funkar det på mobil?</AccordionTrigger>
                <AccordionContent>
                  Ja, SIP CRM är helt responsivt och fungerar perfekt på alla enheter - mobil, surfplatta och dator.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="glass border rounded-lg px-6">
                <AccordionTrigger>Kan jag växla tema?</AccordionTrigger>
                <AccordionContent>
                  Absolut! Du kan växla mellan ljust och mörkt tema. Systemet kommer ihåg ditt val för nästa gång.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="glass border rounded-lg px-6">
                <AccordionTrigger>Hur lägger jag till produkter och bundles?</AccordionTrigger>
                <AccordionContent>
                  Gå till Admin → Artiklar för att lägga till produkter, tjänster och bundles. Sedan kan du använda dem
                  i dina projekt.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="glass border rounded-lg px-6">
                <AccordionTrigger>Hur öppnar jag kundkortet?</AccordionTrigger>
                <AccordionContent>
                  Klicka på en rad i Kunddatabasen eller navigera direkt till /customers?id=&lt;id&gt; för en specifik
                  kund.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="glass border rounded-lg px-6">
                <AccordionTrigger>Finns det en gratis version?</AccordionTrigger>
                <AccordionContent>
                  Ja, vår Start-plan är helt gratis och inkluderar grundläggande funktioner för upp till 10 kunder.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="glass border rounded-lg px-6">
                <AccordionTrigger>Kan jag importera befintliga kunddata?</AccordionTrigger>
                <AccordionContent>
                  I Pro- och Team-planerna kan du importera kunddata från Excel eller CSV-filer. Kontakta support för
                  hjälp.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                S
              </div>
              <span className="font-playfair font-bold text-xl">SIP CRM</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Om
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Kontakt
              </Link>
            </nav>

            <p className="text-sm text-muted-foreground">Built by Teo Gustavson</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
