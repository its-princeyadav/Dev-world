import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the connection across hot-reloads in dev and across invocations in
// serverless environments, so we don't open a new connection per request.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

// These fire on the underlying connection regardless of which caller
// triggered connectDB(), so they're registered once — not inside
// connectDB() itself, which only runs its body on the first call.
let listenersAttached = global._mongooseListenersAttached ?? false;
function attachConnectionLogging() {
  if (listenersAttached) return;
  listenersAttached = global._mongooseListenersAttached = true;

  mongoose.connection.on("error", (err) => {
    console.error("✗ MongoDB connection error:", err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠ MongoDB disconnected");
  });
  mongoose.connection.on("reconnected", () => {
    console.log("✓ MongoDB reconnected");
  });
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    console.error("✗ Missing MONGODB_URI environment variable — add it to .env.local");
    throw new Error("Missing MONGODB_URI environment variable");
  }

  attachConnectionLogging();

  if (!cached.promise) {
    console.log("… Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => {
        console.log(`✓ MongoDB connected successfully (database: ${m.connection.name})`);
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("✗ MongoDB connection failed:", err.message);
    throw err;
  }

  return cached.conn;
}
