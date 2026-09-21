import JobOpening from "@/models/JobOpening";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(JobOpening);
