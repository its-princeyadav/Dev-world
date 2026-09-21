import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/apiHelpers";
import ContactSubmission from "@/models/ContactSubmission";
import CareerApplication from "@/models/CareerApplication";
import Project from "@/models/Project";
import BlogPost from "@/models/BlogPost";
import Service from "@/models/Service";

export async function GET(request) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const [
    newSubmissions,
    totalSubmissions,
    newApplications,
    totalApplications,
    projectCount,
    blogCount,
    serviceCount,
    recentSubmissions,
    recentApplications,
  ] = await Promise.all([
    ContactSubmission.countDocuments({ status: "new" }),
    ContactSubmission.countDocuments(),
    CareerApplication.countDocuments({ status: "new" }),
    CareerApplication.countDocuments(),
    Project.countDocuments(),
    BlogPost.countDocuments(),
    Service.countDocuments(),
    ContactSubmission.find().sort("-createdAt").limit(5).lean(),
    CareerApplication.find().sort("-createdAt").limit(5).lean(),
  ]);

  return NextResponse.json({
    stats: {
      newSubmissions,
      totalSubmissions,
      newApplications,
      totalApplications,
      projectCount,
      blogCount,
      serviceCount,
    },
    recentSubmissions,
    recentApplications,
  });
}
