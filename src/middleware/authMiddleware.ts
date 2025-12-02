import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Invalid Authorization header format" });
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded; // { sub, email, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
