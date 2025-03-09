//* Libraries imports
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as Schema from "./schema";
export { Schema };

const client = createClient({
  url: process.env.DATABASE_URL as string,
});

export const db = drizzle({ client, schema: Schema });