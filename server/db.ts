import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

export let db: ReturnType<typeof drizzle> | null = null;
export let pool: Pool | null = null;

try {
  if (!process.env.DATABASE_URL) {
    console.warn("⚠️ DATABASE_URL non défini — le backend utilisera le mode sans base de données.");
  } else {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
    console.log("✅ Base de données connectée");
  }
} catch (err) {
  console.warn("⚠️ Impossible de se connecter à la base :", (err as Error).message);
  console.warn("Le serveur démarre en mode sans base de données.");
}
