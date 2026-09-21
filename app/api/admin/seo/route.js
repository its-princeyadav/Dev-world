import SeoMeta from "@/models/SeoMeta";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(SeoMeta);
