import Technology from "@/models/Technology";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(Technology, { sort: "order" });
