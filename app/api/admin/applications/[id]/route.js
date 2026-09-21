import CareerApplication from "@/models/CareerApplication";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(CareerApplication);
