"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_1 = require("./admin");
const user_1 = require("./user");
const space_1 = require("./space");
const types_1 = require("../../types");
const client_1 = require("@repo/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
exports.router = (0, express_1.Router)();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation Failed" });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(parsedData.data.password, 10);
    try {
        const user = yield client_1.default.user.findUnique({
            where: {
                username: parsedData.data.username,
                password: hashedPassword
            },
        });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Incorrect password" });
            return;
        }
        res.json({ message: "Login successful" });
    }
    catch (e) {
        res.status(400).json({ message: "Something went wrong" });
    }
}));
exports.router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation Failed" });
        return;
    }
    try {
        const user = yield client_1.default.user.findUnique({
            where: {
                username: parsedData.data.username,
            },
        });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role
        }, config_1.JWT_PASSWORD);
        res.json({
            token
        });
    }
    catch (_a) {
    }
}));
exports.router.get("/elements", (req, res) => {
});
exports.router.get("/avatars", (req, res) => {
});
exports.router.use("/user", user_1.userRouter);
exports.router.use("/admin", admin_1.adminRouter);
exports.router.use("/space", space_1.spaceRouter);
