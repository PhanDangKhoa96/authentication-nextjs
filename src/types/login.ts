import { loginSchema } from "@/schemas";
import { z } from "zod";

export type LoginValueType = z.infer<typeof loginSchema>;
