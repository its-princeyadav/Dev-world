import JobOpening from "@/models/JobOpening";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(JobOpening);
