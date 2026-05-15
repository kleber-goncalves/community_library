import { z } from "zod";

// esquema de validação do user com zod
const userSchema = z.object({
    username: z.string().min(3, "Username is required at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password is required at least 6 characters"),
    avatar: z.string().url("Invalid URL").optional(),
});

const userIdSchema = z.object({
    id: z.number().int().positive("User ID is required"),
});

export { userSchema, userIdSchema };
