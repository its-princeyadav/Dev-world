import Technology from "@/models/Technology";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(Technology);
