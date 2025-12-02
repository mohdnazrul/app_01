import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import {
    UserService,
    CreateUserInput,
    UpdateUserInput,
} from "../services/UserService";

// Helper to remove password before sending to client
const toSafeUser = (user: any) => {
    const { password, ...rest } = user;
    return rest;
};

// ---- existing profile handler ----
export const getProfile = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = Number(req.user.sub);
    const user = await UserService.findById(userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json(toSafeUser(user));
};

// ---- new CRUD handlers ----

// GET /api/users
export const listUsers = async (req: Request, res: Response) => {
    const users = await UserService.listUsers();
    return res.json(users.map(toSafeUser));
};

// POST /api/users  (create user / register)
export const createUser = async (req: Request, res: Response) => {
    const { email, name, password } = req.body as CreateUserInput;

    if (!email || !name || !password) {
        return res.status(400).json({ error: "email, name and password are required" });
    }

    // check duplicate email
    const existing = await UserService.findByEmail(email);
    if (existing) {
        return res.status(409).json({ error: "Email already in use" });
    }

    const user = await UserService.createUser({ email, name, password });
    return res.status(201).json(toSafeUser(user));
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const user = await UserService.findById(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json(toSafeUser(user));
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, email, password } = req.body as UpdateUserInput;

    const user = await UserService.updateUser(id, { name, email, password });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json(toSafeUser(user));
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    // optional: check exists first
    const existing = await UserService.findById(id);
    if (!existing) {
        return res.status(404).json({ error: "User not found" });
    }

    await UserService.deleteUser(id);
    return res.status(204).send();
};
