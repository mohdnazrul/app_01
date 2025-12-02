import { Router } from "express";
import {
    getProfile,
    listUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

// Public or protected? You choose.
// For now, let's assume:
// - createUser (register) is public
// - other user ops require auth

// Public register
router.post("/", createUser);

// All below require Bearer token
router.use(authMiddleware);

// GET /api/users/me
router.get("/me", getProfile);

// GET /api/users
router.get("/", listUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;
