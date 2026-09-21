import Testimonial from "@/models/Testimonial";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(Testimonial);
