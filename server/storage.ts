// storage.ts
import { type User, type InsertUser, type GlobalSection, type InsertGlobalSection, type Room, type InsertRoom, type Restaurant, type InsertRestaurant, type Event, type InsertEvent, type Venue, type InsertVenue, type Offer, type InsertOffer, type Attraction, type InsertAttraction, type Facility, type InsertFacility, type Program, type InsertProgram, type Service, type InsertService, type Gallery, type InsertGallery, type ContactInfo, type InsertContactInfo } from "@shared/schema";
import { db } from "./db";
import { users, globalSections, rooms, restaurants, events, venues, offers, attractions, facilities, programs, services, galleries, contactInfos } from "@shared/schema";
import { eq } from "drizzle-orm";

// Define Update types
export type UpdateUser = Partial<InsertUser>;
export type UpdateGlobalSection = Partial<InsertGlobalSection>;
export type UpdateRoom = Partial<InsertRoom>;
export type UpdateRestaurant = Partial<InsertRestaurant>;
export type UpdateEvent = Partial<InsertEvent>;
export type UpdateVenue = Partial<InsertVenue>;
export type UpdateOffer = Partial<InsertOffer>;
export type UpdateAttraction = Partial<InsertAttraction>;
export type UpdateFacility = Partial<InsertFacility>;
export type UpdateProgram = Partial<InsertProgram>;
export type UpdateService = Partial<InsertService>;
export type UpdateGallery = Partial<InsertGallery>;
export type UpdateContactInfo = Partial<InsertContactInfo>;

export interface IStorage {
  // Users methods
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: UpdateUser): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;

  // GlobalSections methods
  getAllGlobalSections(): Promise<GlobalSection[]>;
  getGlobalSectionById(id: number): Promise<GlobalSection | undefined>;
  getGlobalSectionByKey(key: string): Promise<GlobalSection | undefined>;
  createGlobalSection(globalSection: InsertGlobalSection): Promise<GlobalSection>;
  updateGlobalSection(id: number, globalSection: UpdateGlobalSection): Promise<GlobalSection | undefined>;
  deleteGlobalSection(id: number): Promise<boolean>;

  // Rooms methods
  getAllRooms(): Promise<Room[]>;
  getRoomById(id: number): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoom(id: number, room: UpdateRoom): Promise<Room | undefined>;
  deleteRoom(id: number): Promise<boolean>;

  // Restaurants methods
  getAllRestaurants(): Promise<Restaurant[]>;
  getRestaurantById(id: number): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  updateRestaurant(id: number, restaurant: UpdateRestaurant): Promise<Restaurant | undefined>;
  deleteRestaurant(id: number): Promise<boolean>;

  // Events methods
  getAllEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: UpdateEvent): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  // Venues methods
  getAllVenues(): Promise<Venue[]>;
  getVenueById(id: number): Promise<Venue | undefined>;
  createVenue(venue: InsertVenue): Promise<Venue>;
  updateVenue(id: number, venue: UpdateVenue): Promise<Venue | undefined>;
  deleteVenue(id: number): Promise<boolean>;

  // Offers methods
  getAllOffers(): Promise<Offer[]>;
  getOfferById(id: number): Promise<Offer | undefined>;
  createOffer(offer: InsertOffer): Promise<Offer>;
  updateOffer(id: number, offer: UpdateOffer): Promise<Offer | undefined>;
  deleteOffer(id: number): Promise<boolean>;

  // Attractions methods
  getAllAttractions(): Promise<Attraction[]>;
  getAttractionById(id: number): Promise<Attraction | undefined>;
  createAttraction(attraction: InsertAttraction): Promise<Attraction>;
  updateAttraction(id: number, attraction: UpdateAttraction): Promise<Attraction | undefined>;
  deleteAttraction(id: number): Promise<boolean>;

  // Facilities methods
  getAllFacilities(): Promise<Facility[]>;
  getFacilityById(id: number): Promise<Facility | undefined>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  updateFacility(id: number, facility: UpdateFacility): Promise<Facility | undefined>;
  deleteFacility(id: number): Promise<boolean>;

  // Programs methods
  getAllPrograms(): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: number, program: UpdateProgram): Promise<Program | undefined>;
  deleteProgram(id: number): Promise<boolean>;

  // Services methods
  getAllServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: UpdateService): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Galleries methods
  getAllGalleries(): Promise<Gallery[]>;
  getGalleryById(id: number): Promise<Gallery | undefined>;
  createGallery(gallery: InsertGallery): Promise<Gallery>;
  updateGallery(id: number, gallery: UpdateGallery): Promise<Gallery | undefined>;
  deleteGallery(id: number): Promise<boolean>;

  // ContactInfos methods
  getAllContactInfos(): Promise<ContactInfo[]>;
  getContactInfoById(id: number): Promise<ContactInfo | undefined>;
  createContactInfo(contactInfo: InsertContactInfo): Promise<ContactInfo>;
  updateContactInfo(id: number, contactInfo: UpdateContactInfo): Promise<ContactInfo | undefined>;
  deleteContactInfo(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users methods
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.createdAt);
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updateUser: UpdateUser): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updateUser, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // GlobalSections methods
  async getAllGlobalSections(): Promise<GlobalSection[]> {
    return await db.select().from(globalSections).orderBy(globalSections.updatedAt);
  }

  async getGlobalSectionById(id: number): Promise<GlobalSection | undefined> {
    const [section] = await db.select().from(globalSections).where(eq(globalSections.id, id));
    return section || undefined;
  }

  async getGlobalSectionByKey(key: string): Promise<GlobalSection | undefined> {
    const [section] = await db.select().from(globalSections).where(eq(globalSections.sectionKey, key));
    return section || undefined;
  }

  async createGlobalSection(insertGlobalSection: InsertGlobalSection): Promise<GlobalSection> {
    const [section] = await db.insert(globalSections).values(insertGlobalSection).returning();
    return section;
  }

  async updateGlobalSection(id: number, updateGlobalSection: UpdateGlobalSection): Promise<GlobalSection | undefined> {
    const [section] = await db
      .update(globalSections)
      .set({ ...updateGlobalSection, updatedAt: new Date() })
      .where(eq(globalSections.id, id))
      .returning();
    return section || undefined;
  }

  async deleteGlobalSection(id: number): Promise<boolean> {
    const result = await db.delete(globalSections).where(eq(globalSections.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Rooms methods
  async getAllRooms(): Promise<Room[]> {
    return await db.select().from(rooms).orderBy(rooms.updatedAt);
  }

  async getRoomById(id: number): Promise<Room | undefined> {
    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));
    return room || undefined;
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const [room] = await db.insert(rooms).values(insertRoom).returning();
    return room;
  }

  async updateRoom(id: number, updateRoom: UpdateRoom): Promise<Room | undefined> {
    const [room] = await db
      .update(rooms)
      .set({ ...updateRoom, updatedAt: new Date() })
      .where(eq(rooms.id, id))
      .returning();
    return room || undefined;
  }

  async deleteRoom(id: number): Promise<boolean> {
    const result = await db.delete(rooms).where(eq(rooms.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Restaurants methods
  async getAllRestaurants(): Promise<Restaurant[]> {
    return await db.select().from(restaurants).orderBy(restaurants.updatedAt);
  }

  async getRestaurantById(id: number): Promise<Restaurant | undefined> {
    const [restaurant] = await db.select().from(restaurants).where(eq(restaurants.id, id));
    return restaurant || undefined;
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const [restaurant] = await db.insert(restaurants).values(insertRestaurant).returning();
    return restaurant;
  }

  async updateRestaurant(id: number, updateRestaurant: UpdateRestaurant): Promise<Restaurant | undefined> {
    const [restaurant] = await db
      .update(restaurants)
      .set({ ...updateRestaurant, updatedAt: new Date() })
      .where(eq(restaurants.id, id))
      .returning();
    return restaurant || undefined;
  }

  async deleteRestaurant(id: number): Promise<boolean> {
    const result = await db.delete(restaurants).where(eq(restaurants.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Events methods
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(events.updatedAt);
  }

  async getEventById(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }

  async updateEvent(id: number, updateEvent: UpdateEvent): Promise<Event | undefined> {
    const [event] = await db
      .update(events)
      .set({ ...updateEvent, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return event || undefined;
  }

  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Venues methods
  async getAllVenues(): Promise<Venue[]> {
    return await db.select().from(venues).orderBy(venues.updatedAt);
  }

  async getVenueById(id: number): Promise<Venue | undefined> {
    const [venue] = await db.select().from(venues).where(eq(venues.id, id));
    return venue || undefined;
  }

  async createVenue(insertVenue: InsertVenue): Promise<Venue> {
    const [venue] = await db.insert(venues).values(insertVenue).returning();
    return venue;
  }

  async updateVenue(id: number, updateVenue: UpdateVenue): Promise<Venue | undefined> {
    const [venue] = await db
      .update(venues)
      .set({ ...updateVenue, updatedAt: new Date() })
      .where(eq(venues.id, id))
      .returning();
    return venue || undefined;
  }

  async deleteVenue(id: number): Promise<boolean> {
    const result = await db.delete(venues).where(eq(venues.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Offers methods
  async getAllOffers(): Promise<Offer[]> {
    return await db.select().from(offers).orderBy(offers.updatedAt);
  }

  async getOfferById(id: number): Promise<Offer | undefined> {
    const [offer] = await db.select().from(offers).where(eq(offers.id, id));
    return offer || undefined;
  }

  async createOffer(insertOffer: InsertOffer): Promise<Offer> {
    const [offer] = await db.insert(offers).values(insertOffer).returning();
    return offer;
  }

  async updateOffer(id: number, updateOffer: UpdateOffer): Promise<Offer | undefined> {
    const [offer] = await db
      .update(offers)
      .set({ ...updateOffer, updatedAt: new Date() })
      .where(eq(offers.id, id))
      .returning();
    return offer || undefined;
  }

  async deleteOffer(id: number): Promise<boolean> {
    const result = await db.delete(offers).where(eq(offers.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Attractions methods
  async getAllAttractions(): Promise<Attraction[]> {
    return await db.select().from(attractions).orderBy(attractions.updatedAt);
  }

  async getAttractionById(id: number): Promise<Attraction | undefined> {
    const [attraction] = await db.select().from(attractions).where(eq(attractions.id, id));
    return attraction || undefined;
  }

  async createAttraction(insertAttraction: InsertAttraction): Promise<Attraction> {
    const [attraction] = await db.insert(attractions).values(insertAttraction).returning();
    return attraction;
  }

  async updateAttraction(id: number, updateAttraction: UpdateAttraction): Promise<Attraction | undefined> {
    const [attraction] = await db
      .update(attractions)
      .set({ ...updateAttraction, updatedAt: new Date() })
      .where(eq(attractions.id, id))
      .returning();
    return attraction || undefined;
  }

  async deleteAttraction(id: number): Promise<boolean> {
    const result = await db.delete(attractions).where(eq(attractions.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Facilities methods
  async getAllFacilities(): Promise<Facility[]> {
    return await db.select().from(facilities).orderBy(facilities.updatedAt);
  }

  async getFacilityById(id: number): Promise<Facility | undefined> {
    const [facility] = await db.select().from(facilities).where(eq(facilities.id, id));
    return facility || undefined;
  }

  async createFacility(insertFacility: InsertFacility): Promise<Facility> {
    const [facility] = await db.insert(facilities).values(insertFacility).returning();
    return facility;
  }

  async updateFacility(id: number, updateFacility: UpdateFacility): Promise<Facility | undefined> {
    const [facility] = await db
      .update(facilities)
      .set({ ...updateFacility, updatedAt: new Date() })
      .where(eq(facilities.id, id))
      .returning();
    return facility || undefined;
  }

  async deleteFacility(id: number): Promise<boolean> {
    const result = await db.delete(facilities).where(eq(facilities.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Programs methods
  async getAllPrograms(): Promise<Program[]> {
    return await db.select().from(programs).orderBy(programs.updatedAt);
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program || undefined;
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const [program] = await db.insert(programs).values(insertProgram).returning();
    return program;
  }

  async updateProgram(id: number, updateProgram: UpdateProgram): Promise<Program | undefined> {
    const [program] = await db
      .update(programs)
      .set({ ...updateProgram, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();
    return program || undefined;
  }

  async deleteProgram(id: number): Promise<boolean> {
    const result = await db.delete(programs).where(eq(programs.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Services methods
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.updatedAt);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async updateService(id: number, updateService: UpdateService): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set({ ...updateService, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Galleries methods
  async getAllGalleries(): Promise<Gallery[]> {
    return await db.select().from(galleries).orderBy(galleries.updatedAt);
  }

  async getGalleryById(id: number): Promise<Gallery | undefined> {
    const [gallery] = await db.select().from(galleries).where(eq(galleries.id, id));
    return gallery || undefined;
  }

  async createGallery(insertGallery: InsertGallery): Promise<Gallery> {
    const [gallery] = await db.insert(galleries).values(insertGallery).returning();
    return gallery;
  }

  async updateGallery(id: number, updateGallery: UpdateGallery): Promise<Gallery | undefined> {
    const [gallery] = await db
      .update(galleries)
      .set({ ...updateGallery, updatedAt: new Date() })
      .where(eq(galleries.id, id))
      .returning();
    return gallery || undefined;
  }

  async deleteGallery(id: number): Promise<boolean> {
    const result = await db.delete(galleries).where(eq(galleries.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // ContactInfos methods
  async getAllContactInfos(): Promise<ContactInfo[]> {
    return await db.select().from(contactInfos).orderBy(contactInfos.updatedAt);
  }

  async getContactInfoById(id: number): Promise<ContactInfo | undefined> {
    const [contactInfo] = await db.select().from(contactInfos).where(eq(contactInfos.id, id));
    return contactInfo || undefined;
  }

  async createContactInfo(insertContactInfo: InsertContactInfo): Promise<ContactInfo> {
    const [contactInfo] = await db.insert(contactInfos).values(insertContactInfo).returning();
    return contactInfo;
  }

  async updateContactInfo(id: number, updateContactInfo: UpdateContactInfo): Promise<ContactInfo | undefined> {
    const [contactInfo] = await db
      .update(contactInfos)
      .set({ ...updateContactInfo, updatedAt: new Date() })
      .where(eq(contactInfos.id, id))
      .returning();
    return contactInfo || undefined;
  }

  async deleteContactInfo(id: number): Promise<boolean> {
    const result = await db.delete(contactInfos).where(eq(contactInfos.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DatabaseStorage();