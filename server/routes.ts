// server/routes.ts
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  selectUserSchema,
  insertGlobalSectionSchema,
  selectGlobalSectionSchema,
  insertRoomSchema,
  selectRoomSchema,
  insertRestaurantSchema,
  selectRestaurantSchema,
  insertEventSchema,
  selectEventSchema,
  insertVenueSchema,
  selectVenueSchema,
  insertOfferSchema,
  selectOfferSchema,
  insertAttractionSchema,
  selectAttractionSchema,
  insertFacilitySchema,
  selectFacilitySchema,
  insertProgramSchema,
  selectProgramSchema,
  insertServiceSchema,
  selectServiceSchema,
  insertGallerySchema,
  selectGallerySchema,
  insertContactInfoSchema,
  selectContactInfoSchema,
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import express from "express";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'carlton-admin-secret-2025';

interface AuthRequest extends Request {
  user?: z.infer<typeof selectUserSchema>;
}

const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  if (token !== ADMIN_TOKEN) return res.status(403).json({ error: 'Invalid token' });

  req.user = { id: 1, email: 'admin@carlton.mg', fullName: 'Admin User', isAdmin: true };
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // LOGIN
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const validation = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password required")
      }).safeParse({ email, password });

      if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });

      const user = await storage.getUserByEmail(email);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const hash = user.passwordHash;
      let validPassword = bcrypt.compareSync(password, hash) || password === hash;
      if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

      res.json({
        token: ADMIN_TOKEN,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // REGISTER
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validated = insertUserSchema.parse(req.body);
      const hashedPassword = bcrypt.hashSync(validated.passwordHash, 10);
      const user = await storage.createUser({ ...validated, passwordHash: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Register error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // USERS ROUTES (Admin only for all operations, login/register public)
  app.get("/api/users", requireAuth, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/users/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const user = await storage.getUserById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/users/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectUserSchema.partial().parse(req.body);
      const updatedUser = await storage.updateUser(id, updateData);
      if (!updatedUser) return res.status(404).json({ error: "User not found" });
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/users/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteUser(id);
      if (!deleted) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted" });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GLOBAL SECTIONS ROUTES (GET public, others admin only)
  app.get("/api/globalSections", async (req, res) => {
    try {
      const sections = await storage.getAllGlobalSections();
      res.json(sections);
    } catch (error) {
      console.error("Get global sections error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/globalSections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const section = await storage.getGlobalSectionById(id);
      if (!section) return res.status(404).json({ error: "Global section not found" });
      res.json(section);
    } catch (error) {
      console.error("Get global section error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/globalSections/key/:key", async (req, res) => {
    try {
      const key = req.params.key;
      const section = await storage.getGlobalSectionByKey(key);
      if (!section) return res.status(404).json({ error: "Global section not found" });
      res.json(section);
    } catch (error) {
      console.error("Get global section by key error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/globalSections", requireAuth, async (req, res) => {
    try {
      const validated = insertGlobalSectionSchema.parse(req.body);
      const section = await storage.createGlobalSection(validated);
      res.status(201).json(section);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create global section error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/globalSections/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectGlobalSectionSchema.partial().parse(req.body);
      const updatedSection = await storage.updateGlobalSection(id, updateData);
      if (!updatedSection) return res.status(404).json({ error: "Global section not found" });
      res.json(updatedSection);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update global section error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/globalSections/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteGlobalSection(id);
      if (!deleted) return res.status(404).json({ error: "Global section not found" });
      res.json({ message: "Global section deleted" });
    } catch (error) {
      console.error("Delete global section error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ROOMS ROUTES (GET public, others admin only)
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getAllRooms();
      res.json(rooms);
    } catch (error) {
      console.error("Get rooms error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/rooms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const room = await storage.getRoomById(id);
      if (!room) return res.status(404).json({ error: "Room not found" });
      res.json(room);
    } catch (error) {
      console.error("Get room error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/rooms", requireAuth, async (req, res) => {
    try {
      const validated = insertRoomSchema.parse(req.body);
      const room = await storage.createRoom(validated);
      res.status(201).json(room);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create room error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/rooms/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectRoomSchema.partial().parse(req.body);
      const updatedRoom = await storage.updateRoom(id, updateData);
      if (!updatedRoom) return res.status(404).json({ error: "Room not found" });
      res.json(updatedRoom);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update room error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/rooms/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteRoom(id);
      if (!deleted) return res.status(404).json({ error: "Room not found" });
      res.json({ message: "Room deleted" });
    } catch (error) {
      console.error("Delete room error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // RESTAURANTS ROUTES (GET public, others admin only)
  app.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getAllRestaurants();
      res.json(restaurants);
    } catch (error) {
      console.error("Get restaurants error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/restaurants/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const restaurant = await storage.getRestaurantById(id);
      if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
      res.json(restaurant);
    } catch (error) {
      console.error("Get restaurant error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/restaurants", requireAuth, async (req, res) => {
    try {
      const validated = insertRestaurantSchema.parse(req.body);
      const restaurant = await storage.createRestaurant(validated);
      res.status(201).json(restaurant);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create restaurant error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/restaurants/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectRestaurantSchema.partial().parse(req.body);
      const updatedRestaurant = await storage.updateRestaurant(id, updateData);
      if (!updatedRestaurant) return res.status(404).json({ error: "Restaurant not found" });
      res.json(updatedRestaurant);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update restaurant error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/restaurants/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteRestaurant(id);
      if (!deleted) return res.status(404).json({ error: "Restaurant not found" });
      res.json({ message: "Restaurant deleted" });
    } catch (error) {
      console.error("Delete restaurant error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // EVENTS ROUTES (GET public, others admin only)
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const event = await storage.getEventById(id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      console.error("Get event error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/events", requireAuth, async (req, res) => {
    try {
      const validated = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validated);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create event error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/events/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectEventSchema.partial().parse(req.body);
      const updatedEvent = await storage.updateEvent(id, updateData);
      if (!updatedEvent) return res.status(404).json({ error: "Event not found" });
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update event error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/events/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteEvent(id);
      if (!deleted) return res.status(404).json({ error: "Event not found" });
      res.json({ message: "Event deleted" });
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // VENUES ROUTES (GET public, others admin only)
  app.get("/api/venues", async (req, res) => {
    try {
      const venues = await storage.getAllVenues();
      res.json(venues);
    } catch (error) {
      console.error("Get venues error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/venues/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const venue = await storage.getVenueById(id);
      if (!venue) return res.status(404).json({ error: "Venue not found" });
      res.json(venue);
    } catch (error) {
      console.error("Get venue error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/venues", requireAuth, async (req, res) => {
    try {
      const validated = insertVenueSchema.parse(req.body);
      const venue = await storage.createVenue(validated);
      res.status(201).json(venue);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create venue error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/venues/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectVenueSchema.partial().parse(req.body);
      const updatedVenue = await storage.updateVenue(id, updateData);
      if (!updatedVenue) return res.status(404).json({ error: "Venue not found" });
      res.json(updatedVenue);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update venue error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/venues/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteVenue(id);
      if (!deleted) return res.status(404).json({ error: "Venue not found" });
      res.json({ message: "Venue deleted" });
    } catch (error) {
      console.error("Delete venue error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // OFFERS ROUTES (GET public, others admin only)
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getAllOffers();
      res.json(offers);
    } catch (error) {
      console.error("Get offers error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/offers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const offer = await storage.getOfferById(id);
      if (!offer) return res.status(404).json({ error: "Offer not found" });
      res.json(offer);
    } catch (error) {
      console.error("Get offer error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/offers", requireAuth, async (req, res) => {
    try {
      const validated = insertOfferSchema.parse(req.body);
      const offer = await storage.createOffer(validated);
      res.status(201).json(offer);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create offer error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/offers/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectOfferSchema.partial().parse(req.body);
      const updatedOffer = await storage.updateOffer(id, updateData);
      if (!updatedOffer) return res.status(404).json({ error: "Offer not found" });
      res.json(updatedOffer);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update offer error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/offers/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteOffer(id);
      if (!deleted) return res.status(404).json({ error: "Offer not found" });
      res.json({ message: "Offer deleted" });
    } catch (error) {
      console.error("Delete offer error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ATTRACTIONS ROUTES (GET public, others admin only)
  app.get("/api/attractions", async (req, res) => {
    try {
      const attractions = await storage.getAllAttractions();
      res.json(attractions);
    } catch (error) {
      console.error("Get attractions error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/attractions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const attraction = await storage.getAttractionById(id);
      if (!attraction) return res.status(404).json({ error: "Attraction not found" });
      res.json(attraction);
    } catch (error) {
      console.error("Get attraction error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/attractions", requireAuth, async (req, res) => {
    try {
      const validated = insertAttractionSchema.parse(req.body);
      const attraction = await storage.createAttraction(validated);
      res.status(201).json(attraction);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create attraction error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/attractions/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectAttractionSchema.partial().parse(req.body);
      const updatedAttraction = await storage.updateAttraction(id, updateData);
      if (!updatedAttraction) return res.status(404).json({ error: "Attraction not found" });
      res.json(updatedAttraction);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update attraction error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/attractions/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteAttraction(id);
      if (!deleted) return res.status(404).json({ error: "Attraction not found" });
      res.json({ message: "Attraction deleted" });
    } catch (error) {
      console.error("Delete attraction error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // FACILITIES ROUTES (GET public, others admin only)
  app.get("/api/facilities", async (req, res) => {
    try {
      const facilities = await storage.getAllFacilities();
      res.json(facilities);
    } catch (error) {
      console.error("Get facilities error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/facilities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const facility = await storage.getFacilityById(id);
      if (!facility) return res.status(404).json({ error: "Facility not found" });
      res.json(facility);
    } catch (error) {
      console.error("Get facility error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/facilities", requireAuth, async (req, res) => {
    try {
      const validated = insertFacilitySchema.parse(req.body);
      const facility = await storage.createFacility(validated);
      res.status(201).json(facility);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create facility error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/facilities/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectFacilitySchema.partial().parse(req.body);
      const updatedFacility = await storage.updateFacility(id, updateData);
      if (!updatedFacility) return res.status(404).json({ error: "Facility not found" });
      res.json(updatedFacility);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update facility error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/facilities/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteFacility(id);
      if (!deleted) return res.status(404).json({ error: "Facility not found" });
      res.json({ message: "Facility deleted" });
    } catch (error) {
      console.error("Delete facility error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PROGRAMS ROUTES (GET public, others admin only)
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Get programs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const program = await storage.getProgramById(id);
      if (!program) return res.status(404).json({ error: "Program not found" });
      res.json(program);
    } catch (error) {
      console.error("Get program error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/programs", requireAuth, async (req, res) => {
    try {
      const validated = insertProgramSchema.parse(req.body);
      const program = await storage.createProgram(validated);
      res.status(201).json(program);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create program error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/programs/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectProgramSchema.partial().parse(req.body);
      const updatedProgram = await storage.updateProgram(id, updateData);
      if (!updatedProgram) return res.status(404).json({ error: "Program not found" });
      res.json(updatedProgram);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update program error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/programs/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteProgram(id);
      if (!deleted) return res.status(404).json({ error: "Program not found" });
      res.json({ message: "Program deleted" });
    } catch (error) {
      console.error("Delete program error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // SERVICES ROUTES (GET public, others admin only)
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Get services error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const service = await storage.getServiceById(id);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (error) {
      console.error("Get service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/services", requireAuth, async (req, res) => {
    try {
      const validated = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validated);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectServiceSchema.partial().parse(req.body);
      const updatedService = await storage.updateService(id, updateData);
      if (!updatedService) return res.status(404).json({ error: "Service not found" });
      res.json(updatedService);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/services/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteService(id);
      if (!deleted) return res.status(404).json({ error: "Service not found" });
      res.json({ message: "Service deleted" });
    } catch (error) {
      console.error("Delete service error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // GALLERIES ROUTES (GET public, others admin only)
  app.get("/api/galleries", async (req, res) => {
    try {
      const galleries = await storage.getAllGalleries();
      res.json(galleries);
    } catch (error) {
      console.error("Get galleries error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/galleries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const gallery = await storage.getGalleryById(id);
      if (!gallery) return res.status(404).json({ error: "Gallery not found" });
      res.json(gallery);
    } catch (error) {
      console.error("Get gallery error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/galleries", requireAuth, async (req, res) => {
    try {
      const validated = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGallery(validated);
      res.status(201).json(gallery);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create gallery error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/galleries/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectGallerySchema.partial().parse(req.body);
      const updatedGallery = await storage.updateGallery(id, updateData);
      if (!updatedGallery) return res.status(404).json({ error: "Gallery not found" });
      res.json(updatedGallery);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update gallery error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/galleries/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteGallery(id);
      if (!deleted) return res.status(404).json({ error: "Gallery not found" });
      res.json({ message: "Gallery deleted" });
    } catch (error) {
      console.error("Delete gallery error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // CONTACT INFOS ROUTES (GET public, others admin only)
  app.get("/api/contactInfos", async (req, res) => {
    try {
      const contactInfos = await storage.getAllContactInfos();
      res.json(contactInfos);
    } catch (error) {
      console.error("Get contact infos error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/contactInfos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const contactInfo = await storage.getContactInfoById(id);
      if (!contactInfo) return res.status(404).json({ error: "Contact info not found" });
      res.json(contactInfo);
    } catch (error) {
      console.error("Get contact info error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/contactInfos", requireAuth, async (req, res) => {
    try {
      const validated = insertContactInfoSchema.parse(req.body);
      const contactInfo = await storage.createContactInfo(validated);
      res.status(201).json(contactInfo);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Create contact info error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/contactInfos/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const updateData = selectContactInfoSchema.partial().parse(req.body);
      const updatedContactInfo = await storage.updateContactInfo(id, updateData);
      if (!updatedContactInfo) return res.status(404).json({ error: "Contact info not found" });
      res.json(updatedContactInfo);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      console.error("Update contact info error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/contactInfos/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
      const deleted = await storage.deleteContactInfo(id);
      if (!deleted) return res.status(404).json({ error: "Contact info not found" });
      res.json({ message: "Contact info deleted" });
    } catch (error) {
      console.error("Delete contact info error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // FILE UPLOAD (admin only)
  app.post('/api/upload', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const form = formidable({ uploadDir, keepExtensions: true, maxFileSize: 10 * 1024 * 1024 });

      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Erreur lors du téléchargement' });

        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        if (!file) return res.status(400).json({ error: 'Aucun fichier téléchargé' });

        const filename = path.basename(file.filepath);
        const fileUrl = `/uploads/${filename}`;

        res.json({
          message: 'Fichier téléchargé avec succès',
          fileUrl,
          filename,
          originalname: file.originalFilename || filename,
          size: file.size,
          mimetype: file.mimetype
        });
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Erreur lors du téléchargement' });
    }
  });

  // Serve uploaded files (public)
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


  return createServer(app);
}