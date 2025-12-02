import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ENV } from "../config/env";
import { UserService } from "../services/UserService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = {
        sub: user.id,
        email: user.email,
    };

    const token = jwt.sign(payload, ENV.JWT_SECRET, {
        expiresIn: "1h",
    });

    return res.json({
        token_type: "Bearer",
        access_token: token,
        expires_in: 3600,
    });
};
