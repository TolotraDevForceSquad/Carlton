const API_URL = "/api"

export interface Page {
  id: number
  slug: string
  title: string
  description: string | null
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Section {
  id: number
  pageId: number
  type: string
  title: string | null
  content: any
  order: number
  isVisible: boolean
}

export interface Room {
  id: number
  name: string
  description: string | null
  price: string
  capacity: number
  imageUrl: string | null
  amenities: string[] | null
  isAvailable: boolean
}

export interface Restaurant {
  id: number
  name: string
  description: string | null
  cuisine: string | null
  openingHours: string | null
  imageUrl: string | null
  menuUrl: string | null
}

export interface Event {
  id: number
  title: string
  description: string | null
  eventDate: string
  location: string | null
  imageUrl: string | null
  price: string | null
  capacity: number | null
}

export interface Booking {
  id: number
  roomId: number
  guestName: string
  guestEmail: string
  guestPhone: string | null
  checkIn: string
  checkOut: string
  guests: number
  status: string
  totalPrice: string | null
  createdAt: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  createdAt: string
}

export interface GalleryImage {
  id: number
  url: string
  title: string | null
  description: string | null
  category: string | null
  order: number
}

// Pages API
export const pagesApi = {
  getAll: async (): Promise<Page[]> => {
    const res = await fetch(`${API_URL}/pages`)
    if (!res.ok) throw new Error("Failed to fetch pages")
    return res.json()
  },

  getBySlug: async (slug: string): Promise<Page> => {
    const res = await fetch(`${API_URL}/pages/${slug}`)
    if (!res.ok) throw new Error("Failed to fetch page")
    return res.json()
  },

  create: async (data: Partial<Page>): Promise<Page> => {
    const res = await fetch(`${API_URL}/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create page")
    return res.json()
  },

  update: async (id: number, data: Partial<Page>): Promise<Page> => {
    const res = await fetch(`${API_URL}/pages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update page")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/pages/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete page")
  },
}

// Sections API
export const sectionsApi = {
  getByPage: async (pageId: number): Promise<Section[]> => {
    const res = await fetch(`${API_URL}/sections?pageId=${pageId}`)
    if (!res.ok) throw new Error("Failed to fetch sections")
    return res.json()
  },

  create: async (data: Partial<Section>): Promise<Section> => {
    const res = await fetch(`${API_URL}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create section")
    return res.json()
  },

  update: async (id: number, data: Partial<Section>): Promise<Section> => {
    const res = await fetch(`${API_URL}/sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update section")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/sections/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete section")
  },
}

// Rooms API
export const roomsApi = {
  getAll: async (): Promise<Room[]> => {
    const res = await fetch(`${API_URL}/rooms`)
    if (!res.ok) throw new Error("Failed to fetch rooms")
    return res.json()
  },

  create: async (data: Partial<Room>): Promise<Room> => {
    const res = await fetch(`${API_URL}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create room")
    return res.json()
  },

  update: async (id: number, data: Partial<Room>): Promise<Room> => {
    const res = await fetch(`${API_URL}/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update room")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/rooms/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete room")
  },
}

// Restaurants API
export const restaurantsApi = {
  getAll: async (): Promise<Restaurant[]> => {
    const res = await fetch(`${API_URL}/restaurants`)
    if (!res.ok) throw new Error("Failed to fetch restaurants")
    return res.json()
  },

  create: async (data: Partial<Restaurant>): Promise<Restaurant> => {
    const res = await fetch(`${API_URL}/restaurants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create restaurant")
    return res.json()
  },

  update: async (id: number, data: Partial<Restaurant>): Promise<Restaurant> => {
    const res = await fetch(`${API_URL}/restaurants/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update restaurant")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/restaurants/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete restaurant")
  },
}

// Events API
export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    const res = await fetch(`${API_URL}/events`)
    if (!res.ok) throw new Error("Failed to fetch events")
    return res.json()
  },

  create: async (data: Partial<Event>): Promise<Event> => {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create event")
    return res.json()
  },

  update: async (id: number, data: Partial<Event>): Promise<Event> => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update event")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete event")
  },
}

// Bookings API
export const bookingsApi = {
  getAll: async (): Promise<Booking[]> => {
    const res = await fetch(`${API_URL}/bookings`)
    if (!res.ok) throw new Error("Failed to fetch bookings")
    return res.json()
  },

  updateStatus: async (id: number, status: string): Promise<Booking> => {
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) throw new Error("Failed to update booking")
    return res.json()
  },
}

// Contacts API
export const contactsApi = {
  getAll: async (): Promise<Contact[]> => {
    const res = await fetch(`${API_URL}/contacts`)
    if (!res.ok) throw new Error("Failed to fetch contacts")
    return res.json()
  },
}

// Gallery API
export const galleryApi = {
  getAll: async (): Promise<GalleryImage[]> => {
    const res = await fetch(`${API_URL}/gallery`)
    if (!res.ok) throw new Error("Failed to fetch gallery")
    return res.json()
  },

  create: async (data: Partial<GalleryImage>): Promise<GalleryImage> => {
    const res = await fetch(`${API_URL}/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create gallery image")
    return res.json()
  },

  update: async (id: number, data: Partial<GalleryImage>): Promise<GalleryImage> => {
    const res = await fetch(`${API_URL}/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update gallery image")
    return res.json()
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/gallery/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete gallery image")
  },
}

// Upload API
export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) throw new Error("Failed to upload file")
  return res.json()
}

export const cmsService = {
  pages: pagesApi,
  sections: sectionsApi,
  rooms: roomsApi,
  restaurants: restaurantsApi,
  events: eventsApi,
  bookings: bookingsApi,
  contacts: contactsApi,
  gallery: galleryApi,
  uploadFile, // si tu veux l’inclure
};