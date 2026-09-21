import Testimonial from "@/models/Testimonial";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(Testimonial, { sort: "order" });
