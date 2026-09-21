import Project from "@/models/Project";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(Project, { sort: "order" });
