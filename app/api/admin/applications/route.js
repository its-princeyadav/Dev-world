import CareerApplication from "@/models/CareerApplication";
import { createCollectionHandlers } from "@/lib/crudHandlers";

// POST is unused here — applications are created via the public
// /api/careers/apply route, not by admins.
export const { GET } = createCollectionHandlers(CareerApplication);
