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