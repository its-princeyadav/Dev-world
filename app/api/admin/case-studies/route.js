import CaseStudy from "@/models/CaseStudy";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(CaseStudy);
