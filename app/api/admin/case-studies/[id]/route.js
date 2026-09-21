import CaseStudy from "@/models/CaseStudy";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(CaseStudy);
