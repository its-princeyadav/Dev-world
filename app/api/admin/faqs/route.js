import FAQ from "@/models/FAQ";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(FAQ, { sort: "order" });
