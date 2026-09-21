import SeoMeta from "@/models/SeoMeta";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(SeoMeta);
