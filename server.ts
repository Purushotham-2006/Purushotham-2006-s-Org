import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple in-memory "database" for demo purposes
  // In a real app, this would use better-sqlite3 or MongoDB
  let watchlist: string[] = [];

  app.get("/api/movies", (req, res) => {
    // We'll import data in the frontend for simplicity in this demo,
    // but here's how an API would look.
    res.json({ message: "Use the frontend data service for now" });
  });

  app.get("/api/watchlist", (req, res) => {
    res.json(watchlist);
  });

  app.post("/api/watchlist", (req, res) => {
    const { movieId } = req.body;
    if (!watchlist.includes(movieId)) {
      watchlist.push(movieId);
    }
    res.json(watchlist);
  });

  app.delete("/api/watchlist/:id", (req, res) => {
    const { id } = req.params;
    watchlist = watchlist.filter(mid => mid !== id);
    res.json(watchlist);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
