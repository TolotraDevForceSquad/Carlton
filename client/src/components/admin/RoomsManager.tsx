"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { roomsApi, uploadFile, type Room } from "@/lib/cmsService"
import { useToast } from "@/hooks/use-toast"

export function RoomsManager() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    capacity: 2,
    imageUrl: "",
    amenities: "",
    isAvailable: true,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      const data = await roomsApi.getAll()
      setRooms(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les chambres",
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
      setFormData({ ...formData, imageUrl: url })
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
    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)

      const data = {
        ...formData,
        amenities: amenitiesArray.length > 0 ? amenitiesArray : null,
      }

      if (editingRoom) {
        await roomsApi.update(editingRoom.id, data)
        toast({ title: "Chambre mise à jour avec succès" })
      } else {
        await roomsApi.create(data)
        toast({ title: "Chambre créée avec succès" })
      }
      setIsDialogOpen(false)
      resetForm()
      loadRooms()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la chambre",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      name: room.name,
      description: room.description || "",
      price: room.price,
      capacity: room.capacity,
      imageUrl: room.imageUrl || "",
      amenities: room.amenities?.join(", ") || "",
      isAvailable: room.isAvailable,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) return
    try {
      await roomsApi.delete(id)
      toast({ title: "Chambre supprimée avec succès" })
      loadRooms()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la chambre",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingRoom(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      capacity: 2,
      imageUrl: "",
      amenities: "",
      isAvailable: true,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Chambres</h2>
        <Button
          onClick={() => {
            resetForm()
            setIsDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Chambre
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Capacité</TableHead>
              <TableHead>Disponibilité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell>{room.price} Ar</TableCell>
                <TableCell>{room.capacity} personnes</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      room.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.isAvailable ? "Disponible" : "Indisponible"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(room)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(room.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRoom ? "Modifier la chambre" : "Nouvelle chambre"}</DialogTitle>
            <DialogDescription>Créez ou modifiez une chambre de l'hôtel</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la chambre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (Ar)</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Équipements (séparés par des virgules)</Label>
              <Input
                id="amenities"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="WiFi, Climatisation, TV, Mini-bar"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.isAvailable}
                onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
              />
              <Label htmlFor="available">Chambre disponible</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">{editingRoom ? "Mettre à jour" : "Créer"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
