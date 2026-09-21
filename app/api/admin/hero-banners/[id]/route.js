import HeroBanner from "@/models/HeroBanner";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(HeroBanner);
