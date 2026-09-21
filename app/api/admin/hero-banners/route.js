import HeroBanner from "@/models/HeroBanner";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(HeroBanner);
