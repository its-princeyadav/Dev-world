import TeamMember from "@/models/TeamMember";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(TeamMember);
