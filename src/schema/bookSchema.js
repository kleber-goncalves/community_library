import { z } from "zod";

const bookSchema = z.object({
    title: z.string().min(1, "Title is required at least 1 characters"),
    author: z.string().min(1, "Author is required at least 1 characters"),
});

const bookIdSchema = z.object({
    bookId: z.number().int().positive("Book ID is required"),
});

export { bookSchema, bookIdSchema };
