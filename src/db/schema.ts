//* Libraries imports
import { sql, relations } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const usersMealsRelation = relations(usersTable, ({ many }) => ({
  meals: many(mealsTable),
}));

export const mealsTable = sqliteTable("meals", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  description: text(),
  date_time: text().notNull(),
  is_on_diet: integer({ mode: "boolean" }).notNull(),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().default(sql`(CURRENT_TIMESTAMP)`),

  user_id: int().notNull(),
});

export const mealsUserRelation = relations(mealsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [mealsTable.user_id],
    references: [usersTable.id]
  }),
}));