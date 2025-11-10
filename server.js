// server.js
import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

await fastify.register(import("@fastify/cors"), {
  origin: "*",
});

fastify.get("/", async (request, reply) => {
  return { message: "Fastify backend running on ECS 🚀" };
});

fastify.get("/api/data", async (request, reply) => {
  return {
    data: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
  };
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`✅ Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
