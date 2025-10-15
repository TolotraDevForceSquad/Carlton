"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { bookingsApi, type Booking } from "@/lib/cmsService"
import { useToast } from "@/hooks/use-toast"

export function BookingsManager() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const data = await bookingsApi.getAll()
      setBookings(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await bookingsApi.updateStatus(id, status)
      toast({ title: "Statut mis à jour avec succès" })
      loadBookings()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Réservations</h2>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Personnes</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de réservation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.guestName}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{booking.guestEmail}</div>
                    {booking.guestPhone && <div className="text-muted-foreground">{booking.guestPhone}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Arrivée: {new Date(booking.checkIn).toLocaleDateString("fr-FR")}</div>
                    <div>Départ: {new Date(booking.checkOut).toLocaleDateString("fr-FR")}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{booking.totalPrice || "N/A"}</TableCell>
                <TableCell>
                  <Select value={booking.status} onValueChange={(value) => handleStatusChange(booking.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="confirmed">Confirmé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{new Date(booking.createdAt).toLocaleDateString("fr-FR")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
