import BlogPost from "@/models/BlogPost";
import { createCollectionHandlers } from "@/lib/crudHandlers";

export const { GET, POST } = createCollectionHandlers(BlogPost, { sort: "-publishedAt" });
