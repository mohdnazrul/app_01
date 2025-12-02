// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

const router: Router = Router();

// ✅ Simple test route: GET /api/ping
router.get("/ping", (req, res) => {
    res.json({
        ok: true,
        message: "API router is working",
        time: new Date().toISOString(),
    });
});

// Auth routes: /api/auth/...
router.use("/auth", authRoutes);

// User routes: /api/users/...
router.use("/users", userRoutes);

export default router;
