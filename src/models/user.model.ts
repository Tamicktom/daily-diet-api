//* Libraries imports
import { eq } from "drizzle-orm";
import { t, type Static } from "elysia";

//* Local imports
import { Schema, db } from "../db";

const nameSchema = t.String({ minLength: 3, maxLength: 255, error: 'Name is required' });
const emailSchema = t.String({ format: 'email', error: 'Email is required' });
const ageSchema = t.Number({ minimum: 18, maximum: 255, error: 'Age is required' });
const passwordSchema = t.String({ minLength: 8, maxLength: 255, error: 'Password is required' });

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserModel {
  public static createUser = t.Object({
    name: nameSchema,
    email: emailSchema,
    age: ageSchema,
    password: passwordSchema,
  });

  public static updateUser = t.Object({
    name: t.Optional(nameSchema),
    email: t.Optional(emailSchema),
    age: t.Optional(ageSchema),
    password: t.Optional(passwordSchema),
  })

  public static async index() {
    const users = await db
      .select()
      .from(Schema.usersTable);

    return users;
  }

  public static async show(id: number) {
    const user = await db
      .select()
      .from(Schema.usersTable)
      .where(eq(Schema.usersTable.id, id))
      .get();

    return user;
  }

  public static async store(user: Static<typeof UserModel.createUser>) {
    const newUser = await db
      .insert(Schema.usersTable)
      .values({
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password
      })
      .returning()
      .get();

    return newUser;
  }

  public static async update(id: number, user: Static<typeof UserModel.updateUser>) {
    const updatedUser = await db
      .update(Schema.usersTable)
      .set({
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password
      })
      .where(eq(Schema.usersTable.id, id))
      .returning()
      .get();

    return updatedUser;
  }

  public static async delete(id: number) {
    await db
      .delete(Schema.usersTable)
      .where(eq(Schema.usersTable.id, id))
      .execute();

    return { id };
  }

};