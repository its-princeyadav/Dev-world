import Service from "@/models/Service";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(Service, { sort: "order" });
