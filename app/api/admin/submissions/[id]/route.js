import ContactSubmission from "@/models/ContactSubmission";
import { createItemHandlers } from "@/lib/crudHandlers";

// Submissions are archived, not deleted, from the admin UI — DELETE stays
// available on the API for completeness but is intentionally not wired up
// to a button in components/admin.
export const { GET, PATCH, DELETE } = createItemHandlers(ContactSubmission);
