import TeamMember from "@/models/TeamMember";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(TeamMember, { sort: "order" });
