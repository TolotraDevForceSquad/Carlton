// shared/schema.ts
import { pgTable, varchar, boolean, timestamp, serial, integer, jsonb, text, smallint } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

// ============================================
// USERS TABLE
// ============================================

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// GLOBAL SECTIONS TABLE (for hero, footer, nav, home, etc.)
// ============================================
// This table stores non-entity specific content like hero slides, footer sections, main nav, etc.
// Uses JSONB for flexible structure while allowing querying on keys.
export const globalSections = pgTable("global_sections", {
  id: serial("id").primaryKey(),
  sectionKey: varchar("section_key", { length: 100 }).notNull().unique(), // e.g., 'hero_slides', 'footer', 'main_nav'
  dataFr: jsonb("data_fr").notNull(), // JSON for French content (default)
  dataEn: jsonb("data_en").$type<null | object>(), // Explicitly allow null
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id), // Admin who last updated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// ROOMS TABLE (from chambresData, roomsShowcaseData)
// ============================================
export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  nameFr: varchar("name_fr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).$type<null | string>(),
  subtitleFr: text("subtitle_fr").$type<null | string>(),
  subtitleEn: text("subtitle_en").$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  size: varchar("size", { length: 10 }).notNull(), // e.g., "96m²"
  guests: smallint("guests").notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  features: jsonb("features").notNull(), // Array of strings
  amenities: jsonb("amenities").notNull(), // Array of objects {icon, title, desc}
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// RESTAURANTS TABLE (from restaurantsData, restaurantShowcaseData)
// ============================================
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  nameFr: varchar("name_fr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).$type<null | string>(),
  typeFr: varchar("type_fr", { length: 255 }).notNull(),
  typeEn: varchar("type_en", { length: 255 }).$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  detailedDescriptionFr: text("detailed_description_fr").$type<null | string>(),
  detailedDescriptionEn: text("detailed_description_en").$type<null | string>(),
  image: varchar("image", { length: 500 }).notNull(),
  rating: smallint("rating").notNull(),
  priceRange: varchar("price_range", { length: 10 }).notNull(), // e.g., "€€€€"
  hours: varchar("hours", { length: 100 }).notNull(),
  capacity: integer("capacity").$type<null | number>(),
  specialties: jsonb("specialties").notNull(), // Array of strings
  features: jsonb("features").notNull(), // Array of strings
  reservationRequired: boolean("reservation_required").default(false),
  dressCodeFr: varchar("dress_code_fr", { length: 255 }).$type<null | string>(),
  dressCodeEn: varchar("dress_code_en", { length: 255 }).$type<null | string>(),
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// EVENTS TABLE (from evenementsData, mariagesData, corporateData, galasData, celebrationsData)
// ============================================
// Unified table for event types
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 100 }).notNull(), // e.g., 'mariage', 'corporate', 'gala', 'celebration'
  nameFr: varchar("name_fr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).$type<null | string>(),
  subtitleFr: text("subtitle_fr").$type<null | string>(),
  subtitleEn: text("subtitle_en").$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  image: varchar("image", { length: 500 }).notNull(),
  capacity: varchar("capacity", { length: 50 }).notNull(), // e.g., "20 - 200 invités"
  duration: varchar("duration", { length: 100 }).notNull(),
  equipment: jsonb("equipment").notNull(), // Array of strings
  features: jsonb("features").notNull(), // Array of strings
  venues: jsonb("venues").notNull(), // Array of strings
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// VENUES TABLE (from evenementsData venues array)
// ============================================
export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  nameFr: varchar("name_fr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).$type<null | string>(),
  capacity: varchar("capacity", { length: 100 }).notNull(),
  area: varchar("area", { length: 50 }).notNull(), // e.g., "728m²"
  features: jsonb("features").notNull(), // Object or array for capacities like {"classe": 150}
  eventId: integer("event_id").references(() => events.id, { onDelete: "cascade" }).$type<null | number>(), // Optional link to specific event
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// OFFERS TABLE (from offresData)
// ============================================
export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).$type<null | string>(),
  subtitleFr: varchar("subtitle_fr", { length: 255 }).notNull(),
  subtitleEn: varchar("subtitle_en", { length: 255 }).$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  duration: varchar("duration", { length: 100 }).notNull(),
  categoryFr: varchar("category_fr", { length: 100 }).notNull(),
  categoryEn: varchar("category_en", { length: 100 }).$type<null | string>(),
  features: jsonb("features").notNull(), // Array of strings
  validUntil: varchar("valid_until", { length: 50 }).notNull(), // e.g., "31 Mars 2024"
  highlight: varchar("highlight", { length: 100 }).$type<null | string>(), // e.g., "Le plus populaire"
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// ATTRACTIONS TABLE (from decouvrirAntananarivoData attractions and excursions)
// ============================================
export const attractions = pgTable("attractions", {
  id: serial("id").primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  distance: varchar("distance", { length: 100 }).notNull(),
  duration: varchar("duration", { length: 100 }).notNull(),
  categoryFr: varchar("category_fr", { length: 100 }).notNull(),
  categoryEn: varchar("category_en", { length: 100 }).$type<null | string>(),
  highlights: jsonb("highlights").notNull(), // Array of strings
  icon: varchar("icon", { length: 100 }).notNull(),
  price: varchar("price", { length: 50 }).$type<null | string>(), // For excursions
  includes: jsonb("includes").$type<null | object>(), // Array of strings for excursions
  type: varchar("type", { length: 50 }).notNull(), // 'attraction' or 'excursion'
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// FACILITIES TABLE (from bienEtreLoisirsData, loisirsData, spaLeisureData)
// ============================================
export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  nameFr: varchar("name_fr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).$type<null | string>(),
  typeFr: varchar("type_fr", { length: 255 }).notNull(),
  typeEn: varchar("type_en", { length: 255 }).$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  image: varchar("image", { length: 500 }).notNull(),
  hours: varchar("hours", { length: 100 }).notNull(),
  features: jsonb("features").notNull(), // Array of strings
  services: jsonb("services").notNull(), // Array of strings
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// PROGRAMS TABLE (from bienEtreLoisirsData wellnessPrograms)
// ============================================
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).$type<null | string>(),
  duration: varchar("duration", { length: 100 }).notNull(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  highlights: jsonb("highlights").notNull(), // Array of strings
  facilityId: integer("facility_id").references(() => facilities.id).$type<null | number>(), // Optional link
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// SERVICES TABLE (from servicesBoutiquesData, contactData services)
// ============================================
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  icon: varchar("icon", { length: 100 }).notNull(),
  features: jsonb("features").$type<null | object>(), // Optional array
  categoryFr: varchar("category_fr", { length: 100 }).$type<null | string>(),
  categoryEn: varchar("category_en", { length: 100 }).$type<null | string>(),
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// GALLERIES TABLE (from galerieData)
// ============================================
export const galleries = pgTable("galleries", {
  id: serial("id").primaryKey(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).$type<null | string>(),
  descriptionFr: text("description_fr").notNull(),
  descriptionEn: text("description_en").$type<null | string>(),
  categoryFr: varchar("category_fr", { length: 100 }).notNull(),
  categoryEn: varchar("category_en", { length: 100 }).$type<null | string>(),
  images: jsonb("images").notNull(), // Array of {src, altFr, altEn, titleFr, titleEn, category}
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// CONTACT INFO TABLE (from contactData, contactSectionData)
// ============================================
export const contactInfos = pgTable("contact_infos", {
  id: serial("id").primaryKey(),
  icon: varchar("icon", { length: 100 }).notNull(),
  titleFr: varchar("title_fr", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).$type<null | string>(),
  detailsFr: jsonb("details_fr").notNull(), // Array of strings
  detailsEn: jsonb("details_en").$type<null | object>(),
  actionFr: varchar("action_fr", { length: 255 }).$type<null | string>(),
  actionEn: varchar("action_en", { length: 255 }).$type<null | string>(),
  isActive: boolean("is_active").default(true),
  updatedBy: integer("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// ============================================
// RELATIONS
// ============================================

// GlobalSections to Users (updatedBy)
export const globalSectionsRelations = relations(globalSections, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [globalSections.updatedBy],
    references: [users.id],
  }),
}))

// Rooms to Users
export const roomsRelations = relations(rooms, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [rooms.updatedBy],
    references: [users.id],
  }),
}))

// Similar relations for other tables...
export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [restaurants.updatedBy],
    references: [users.id],
  }),
}))

export const eventsRelations = relations(events, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [events.updatedBy],
    references: [users.id],
  }),
}))

export const venuesRelations = relations(venues, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [venues.updatedBy],
    references: [users.id],
  }),
  event: one(events, {
    fields: [venues.eventId],
    references: [events.id],
  }),
}))

// ... (add relations for other tables similarly)

// ============================================
// ZOD SCHEMAS FOR VALIDATION
// ============================================

// Users
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Email invalide"),
  passwordHash: z.string().min(8, "Mot de passe trop court"),
  fullName: z.string().min(2, "Nom complet doit contenir au moins 2 caractères"),
})

export const selectUserSchema = createSelectSchema(users)

export type InsertUser = z.infer<typeof insertUserSchema>
export type User = z.infer<typeof selectUserSchema>

// GlobalSections
export const insertGlobalSectionSchema = createInsertSchema(globalSections, {
  sectionKey: z.string().min(1, "Clé de section requise"),
  dataFr: z.object({}).passthrough(),
  dataEn: z.union([z.object({}).passthrough(), z.null()]),
})

export const selectGlobalSectionSchema = createSelectSchema(globalSections)

export type InsertGlobalSection = z.infer<typeof insertGlobalSectionSchema>
export type GlobalSection = z.infer<typeof selectGlobalSectionSchema>

// Rooms
export const insertRoomSchema = createInsertSchema(rooms, {
  nameFr: z.string().min(1, "Nom en français requis"),
  nameEn: z.union([z.string(), z.null()]).optional(),
  subtitleFr: z.union([z.string(), z.null()]).optional(),
  subtitleEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  size: z.string().min(1),
  guests: z.number().int().positive(),
  features: z.object({}).passthrough(),
  amenities: z.object({}).passthrough(),
})

export const selectRoomSchema = createSelectSchema(rooms)

export type InsertRoom = z.infer<typeof insertRoomSchema>
export type Room = z.infer<typeof selectRoomSchema>

// Restaurants
export const insertRestaurantSchema = createInsertSchema(restaurants, {
  nameFr: z.string().min(1, "Nom en français requis"),
  nameEn: z.union([z.string(), z.null()]).optional(),
  typeFr: z.string().min(1, "Type en français requis"),
  typeEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  detailedDescriptionFr: z.union([z.string(), z.null()]).optional(),
  detailedDescriptionEn: z.union([z.string(), z.null()]).optional(),
  rating: z.number().int().min(1).max(5),
  priceRange: z.string().min(1),
  hours: z.string().min(1),
  capacity: z.union([z.number().int(), z.null()]).optional(),
  specialties: z.object({}).passthrough(),
  features: z.object({}).passthrough(),
  dressCodeFr: z.union([z.string(), z.null()]).optional(),
  dressCodeEn: z.union([z.string(), z.null()]).optional(),
})

export const selectRestaurantSchema = createSelectSchema(restaurants)

export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>
export type Restaurant = z.infer<typeof selectRestaurantSchema>

// Events
export const insertEventSchema = createInsertSchema(events, {
  type: z.string().min(1),
  nameFr: z.string().min(1, "Nom en français requis"),
  nameEn: z.union([z.string(), z.null()]).optional(),
  subtitleFr: z.union([z.string(), z.null()]).optional(),
  subtitleEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  capacity: z.string().min(1),
  duration: z.string().min(1),
  equipment: z.object({}).passthrough(),
  features: z.object({}).passthrough(),
  venues: z.object({}).passthrough(),
})

export const selectEventSchema = createSelectSchema(events)

export type InsertEvent = z.infer<typeof insertEventSchema>
export type Event = z.infer<typeof selectEventSchema>

// Venues
export const insertVenueSchema = createInsertSchema(venues, {
  nameFr: z.string().min(1, "Nom en français requis"),
  nameEn: z.union([z.string(), z.null()]).optional(),
  capacity: z.string().min(1),
  area: z.string().min(1),
  features: z.object({}).passthrough(),
  eventId: z.union([z.number().int(), z.null()]).optional(),
})

export const selectVenueSchema = createSelectSchema(venues)

export type InsertVenue = z.infer<typeof insertVenueSchema>
export type Venue = z.infer<typeof selectVenueSchema>

// Offers
export const insertOfferSchema = createInsertSchema(offers, {
  titleFr: z.string().min(1, "Titre en français requis"),
  titleEn: z.union([z.string(), z.null()]).optional(),
  subtitleFr: z.string().min(1),
  subtitleEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  duration: z.string().min(1),
  categoryFr: z.string().min(1),
  categoryEn: z.union([z.string(), z.null()]).optional(),
  features: z.object({}).passthrough(),
  validUntil: z.string().min(1),
  highlight: z.union([z.string(), z.null()]).optional(),
})

export const selectOfferSchema = createSelectSchema(offers)

export type InsertOffer = z.infer<typeof insertOfferSchema>
export type Offer = z.infer<typeof selectOfferSchema>

// Attractions
export const insertAttractionSchema = createInsertSchema(attractions, {
  titleFr: z.string().min(1, "Titre en français requis"),
  titleEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  distance: z.string().min(1),
  duration: z.string().min(1),
  categoryFr: z.string().min(1),
  categoryEn: z.union([z.string(), z.null()]).optional(),
  highlights: z.object({}).passthrough(),
  icon: z.string().min(1),
  price: z.union([z.string(), z.null()]).optional(),
  includes: z.union([z.object({}).passthrough(), z.null()]).optional(),
  type: z.enum(["attraction", "excursion"]),
})

export const selectAttractionSchema = createSelectSchema(attractions)

export type InsertAttraction = z.infer<typeof insertAttractionSchema>
export type Attraction = z.infer<typeof selectAttractionSchema>

// Facilities
export const insertFacilitySchema = createInsertSchema(facilities, {
  nameFr: z.string().min(1, "Nom en français requis"),
  nameEn: z.union([z.string(), z.null()]).optional(),
  typeFr: z.string().min(1, "Type en français requis"),
  typeEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  hours: z.string().min(1),
  features: z.object({}).passthrough(),
  services: z.object({}).passthrough(),
})

export const selectFacilitySchema = createSelectSchema(facilities)

export type InsertFacility = z.infer<typeof insertFacilitySchema>
export type Facility = z.infer<typeof selectFacilitySchema>

// Programs
export const insertProgramSchema = createInsertSchema(programs, {
  titleFr: z.string().min(1, "Titre en français requis"),
  titleEn: z.union([z.string(), z.null()]).optional(),
  duration: z.string().min(1),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  highlights: z.object({}).passthrough(),
  facilityId: z.union([z.number().int(), z.null()]).optional(),
})

export const selectProgramSchema = createSelectSchema(programs)

export type InsertProgram = z.infer<typeof insertProgramSchema>
export type Program = z.infer<typeof selectProgramSchema>

// Services
export const insertServiceSchema = createInsertSchema(services, {
  titleFr: z.string().min(1, "Titre en français requis"),
  titleEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  icon: z.string().min(1),
  features: z.union([z.object({}).passthrough(), z.null()]).optional(),
  categoryFr: z.union([z.string().min(1), z.null()]).optional(),
  categoryEn: z.union([z.string().min(1), z.null()]).optional(),
})

export const selectServiceSchema = createSelectSchema(services)

export type InsertService = z.infer<typeof insertServiceSchema>
export type Service = z.infer<typeof selectServiceSchema>

// Galleries
export const insertGallerySchema = createInsertSchema(galleries, {
  titleFr: z.string().min(1, "Titre en français requis"),
  titleEn: z.union([z.string(), z.null()]).optional(),
  descriptionFr: z.string().min(1, "Description en français requise"),
  descriptionEn: z.union([z.string(), z.null()]).optional(),
  categoryFr: z.string().min(1),
  categoryEn: z.union([z.string(), z.null()]).optional(),
  images: z.object({}).passthrough(),
})

export const selectGallerySchema = createSelectSchema(galleries)

export type InsertGallery = z.infer<typeof insertGallerySchema>
export type Gallery = z.infer<typeof selectGallerySchema>

// ContactInfos
export const insertContactInfoSchema = createInsertSchema(contactInfos, {
  icon: z.string().min(1),
  titleFr: z.string().min(1, "Titre en français requis"),
  titleEn: z.union([z.string(), z.null()]).optional(),
  detailsFr: z.object({}).passthrough(),
  detailsEn: z.union([z.object({}).passthrough(), z.null()]).optional(),
  actionFr: z.union([z.string(), z.null()]).optional(),
  actionEn: z.union([z.string(), z.null()]).optional(),
})

export const selectContactInfoSchema = createSelectSchema(contactInfos)

export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>
export type ContactInfo = z.infer<typeof selectContactInfoSchema>

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

  // USERS ROUTES (Admin only for CRUD, but login/register public)
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

  // GLOBAL SECTIONS ROUTES
  app.get("/api/globalSections", requireAuth, async (req, res) => {
    try {
      const sections = await storage.getAllGlobalSections();
      res.json(sections);
    } catch (error) {
      console.error("Get global sections error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/globalSections/:id", requireAuth, async (req, res) => {
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

  app.get("/api/globalSections/key/:key", requireAuth, async (req, res) => {
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

  // ROOMS ROUTES
  app.get("/api/rooms", requireAuth, async (req, res) => {
    try {
      const rooms = await storage.getAllRooms();
      res.json(rooms);
    } catch (error) {
      console.error("Get rooms error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/rooms/:id", requireAuth, async (req, res) => {
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

  // RESTAURANTS ROUTES
  app.get("/api/restaurants", requireAuth, async (req, res) => {
    try {
      const restaurants = await storage.getAllRestaurants();
      res.json(restaurants);
    } catch (error) {
      console.error("Get restaurants error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/restaurants/:id", requireAuth, async (req, res) => {
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

  // EVENTS ROUTES
  app.get("/api/events", requireAuth, async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/:id", requireAuth, async (req, res) => {
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

  // VENUES ROUTES
  app.get("/api/venues", requireAuth, async (req, res) => {
    try {
      const venues = await storage.getAllVenues();
      res.json(venues);
    } catch (error) {
      console.error("Get venues error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/venues/:id", requireAuth, async (req, res) => {
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

  // OFFERS ROUTES
  app.get("/api/offers", requireAuth, async (req, res) => {
    try {
      const offers = await storage.getAllOffers();
      res.json(offers);
    } catch (error) {
      console.error("Get offers error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/offers/:id", requireAuth, async (req, res) => {
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

  // ATTRACTIONS ROUTES
  app.get("/api/attractions", requireAuth, async (req, res) => {
    try {
      const attractions = await storage.getAllAttractions();
      res.json(attractions);
    } catch (error) {
      console.error("Get attractions error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/attractions/:id", requireAuth, async (req, res) => {
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

  // FACILITIES ROUTES
  app.get("/api/facilities", requireAuth, async (req, res) => {
    try {
      const facilities = await storage.getAllFacilities();
      res.json(facilities);
    } catch (error) {
      console.error("Get facilities error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/facilities/:id", requireAuth, async (req, res) => {
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

  // PROGRAMS ROUTES
  app.get("/api/programs", requireAuth, async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Get programs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/programs/:id", requireAuth, async (req, res) => {
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

  // SERVICES ROUTES
  app.get("/api/services", requireAuth, async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Get services error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/services/:id", requireAuth, async (req, res) => {
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

  // GALLERIES ROUTES
  app.get("/api/galleries", requireAuth, async (req, res) => {
    try {
      const galleries = await storage.getAllGalleries();
      res.json(galleries);
    } catch (error) {
      console.error("Get galleries error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/galleries/:id", requireAuth, async (req, res) => {
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

  // CONTACT INFOS ROUTES
  app.get("/api/contactInfos", requireAuth, async (req, res) => {
    try {
      const contactInfos = await storage.getAllContactInfos();
      res.json(contactInfos);
    } catch (error) {
      console.error("Get contact infos error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/contactInfos/:id", requireAuth, async (req, res) => {
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

  // FILE UPLOAD
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

  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  return createServer(app);
}