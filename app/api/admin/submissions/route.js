import ContactSubmission from "@/models/ContactSubmission";
import { createCollectionHandlers } from "@/lib/crudHandlers";

// POST is unused here — submissions are created via the public
// /api/contact route, not by admins.
export const { GET } = createCollectionHandlers(ContactSubmission);
