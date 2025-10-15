"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"
import { pagesApi, sectionsApi, type Page, type Section } from "@/lib/cmsService"
import { useToast } from "@/hooks/use-toast"

export function SectionsManager() {
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [formData, setFormData] = useState({
    type: "hero",
    title: "",
    content: "{}",
    order: 0,
    isVisible: true,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadPages()
  }, [])

  useEffect(() => {
    if (selectedPageId) {
      loadSections(selectedPageId)
    }
  }, [selectedPageId])

  const loadPages = async () => {
    try {
      const data = await pagesApi.getAll()
      setPages(data)
      if (data.length > 0 && !selectedPageId) {
        setSelectedPageId(data[0].id)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les pages",
        variant: "destructive",
      })
    }
  }

  const loadSections = async (pageId: number) => {
    try {
      const data = await sectionsApi.getByPage(pageId)
      setSections(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les sections",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPageId) return

    try {
      let content
      try {
        content = JSON.parse(formData.content)
      } catch {
        toast({
          title: "Erreur",
          description: "Le contenu JSON n'est pas valide",
          variant: "destructive",
        })
        return
      }

      const data = {
        ...formData,
        pageId: selectedPageId,
        content,
      }

      if (editingSection) {
        await sectionsApi.update(editingSection.id, data)
        toast({ title: "Section mise à jour avec succès" })
      } else {
        await sectionsApi.create(data)
        toast({ title: "Section créée avec succès" })
      }
      setIsDialogOpen(false)
      resetForm()
      loadSections(selectedPageId)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la section",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (section: Section) => {
    setEditingSection(section)
    setFormData({
      type: section.type,
      title: section.title || "",
      content: JSON.stringify(section.content, null, 2),
      order: section.order,
      isVisible: section.isVisible,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette section ?")) return
    try {
      await sectionsApi.delete(id)
      toast({ title: "Section supprimée avec succès" })
      if (selectedPageId) loadSections(selectedPageId)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la section",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingSection(null)
    setFormData({
      type: "hero",
      title: "",
      content: "{}",
      order: sections.length,
      isVisible: true,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Gestion des Sections</h2>
          <p className="text-sm text-muted-foreground">Gérez le contenu des sections de vos pages</p>
        </div>
        <Button
          onClick={() => {
            resetForm()
            setIsDialogOpen(true)
          }}
          disabled={!selectedPageId}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Section
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Sélectionner une page</Label>
        <Select value={selectedPageId?.toString()} onValueChange={(value) => setSelectedPageId(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir une page" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.id} value={page.id.toString()}>
                {page.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{section.title || `Section ${section.type}`}</CardTitle>
                    <CardDescription>
                      Type: {section.type} • Ordre: {section.order}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      section.isVisible ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {section.isVisible ? "Visible" : "Masqué"}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(section)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(section.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                {JSON.stringify(section.content, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSection ? "Modifier la section" : "Nouvelle section"}</DialogTitle>
            <DialogDescription>Créez ou modifiez une section de contenu</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de section</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero</SelectItem>
                  <SelectItem value="text">Texte</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="gallery">Galerie</SelectItem>
                  <SelectItem value="cards">Cartes</SelectItem>
                  <SelectItem value="cta">Call to Action</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Titre (optionnel)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Contenu (JSON)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="font-mono text-sm"
                placeholder='{"text": "Votre contenu ici"}'
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Ordre d'affichage</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="visible"
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
              />
              <Label htmlFor="visible">Section visible</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">{editingSection ? "Mettre à jour" : "Créer"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
