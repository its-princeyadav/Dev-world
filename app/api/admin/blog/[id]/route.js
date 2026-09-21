import BlogPost from "@/models/BlogPost";
import { createItemHandlers } from "@/lib/crudHandlers";

export const { GET, PATCH, DELETE } = createItemHandlers(BlogPost);
