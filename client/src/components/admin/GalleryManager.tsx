"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Trash2, Upload } from "lucide-react"
import { galleryApi, uploadFile, type GalleryImage } from "@/lib/cmsService"
import { useToast } from "@/hooks/use-toast"

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const data = await galleryApi.getAll()
      setImages(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la galerie",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const { url } = await uploadFile(file)
      setFormData({ ...formData, url })
      toast({ title: "Image uploadée avec succès" })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'uploader l'image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.url) {
      toast({
        title: "Erreur",
        description: "Veuillez uploader une image",
        variant: "destructive",
      })
      return
    }

    try {
      await galleryApi.create({
        ...formData,
        order: images.length,
      })
      toast({ title: "Image ajoutée à la galerie" })
      setIsDialogOpen(false)
      resetForm()
      loadImages()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'image",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return
    try {
      await galleryApi.delete(id)
      toast({ title: "Image supprimée avec succès" })
      loadImages()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      url: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Galerie d'Images</h2>
        <Button
          onClick={() => {
            resetForm()
            setIsDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une Image
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group rounded-lg overflow-hidden border">
            <img src={image.url || "/placeholder.svg"} alt={image.title || ""} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {image.title && (
              <div className="p-2 bg-background">
                <p className="text-sm font-medium truncate">{image.title}</p>
                {image.category && <p className="text-xs text-muted-foreground">{image.category}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une image</DialogTitle>
            <DialogDescription>Uploadez une nouvelle image dans la galerie</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Image</Label>
              <div className="flex items-center gap-2">
                <Input id="file" type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                {uploading && <Upload className="h-4 w-4 animate-spin" />}
              </div>
              {formData.url && (
                <img
                  src={formData.url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Chambres, Restaurant, Événements..."
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={!formData.url}>
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
