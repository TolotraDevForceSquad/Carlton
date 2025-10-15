"use client"

import { useState, useEffect } from "react"
import { useLocation } from "wouter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Layout, ImageIcon, Bed, Calendar, Mail, LogOut } from "lucide-react"
import { PagesManager } from "@/components/admin/PagesManager"
import { SectionsManager } from "@/components/admin/SectionsManager"
import { GalleryManager } from "@/components/admin/GalleryManager"
import { RoomsManager } from "@/components/admin/RoomsManager"
import { BookingsManager } from "@/components/admin/BookingsManager"

export default function Admin() {
  const [activeTab, setActiveTab] = useState("pages")
  const [, setLocation] = useLocation()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken")
    if (!token) {
      setLocation("/admin/login")
    }
  }, [setLocation])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setLocation("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">CMS Admin - Carlton Madagascar</h1>
              <p className="text-sm text-muted-foreground">Gérer le contenu du site web</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid="button-back-to-site">
                <a href="/" className="flex items-center gap-2">
                  Retour au site
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-6 mx-auto" data-testid="tabs-admin">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Sections
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Galerie
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              Chambres
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Réservations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <PagesManager />
          </TabsContent>

          <TabsContent value="sections">
            <SectionsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="rooms">
            <RoomsManager />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>

          <TabsContent value="contacts">
            <div className="text-center py-12 text-muted-foreground">Module de gestion des contacts à venir</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
