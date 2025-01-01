"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMapSchema = exports.CreateAvatarSchema = exports.UpdateElementSchema = exports.CreateElementSchema = exports.AddElementSchema = exports.CreateSpaceSchema = exports.UpdateMetadataSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const Zod_1 = __importDefault(require("Zod"));
exports.SignupSchema = Zod_1.default.object({
    username: Zod_1.default.string(),
    password: Zod_1.default.string().min(8),
    type: Zod_1.default.enum(["user", "admin"]),
});
exports.SigninSchema = Zod_1.default.object({
    username: Zod_1.default.string(),
    password: Zod_1.default.string().min(8)
});
exports.UpdateMetadataSchema = Zod_1.default.object({
    avatarId: Zod_1.default.string().min(1),
});
//dimensions in the below schema is being validated using regex, WKT it should be something like 100x100 so we do a expression matching of 4 digits x 4 digits
exports.CreateSpaceSchema = Zod_1.default.object({
    name: Zod_1.default.string().min(1),
    dimensions: Zod_1.default.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    mapId: Zod_1.default.string().min(1)
});
exports.AddElementSchema = Zod_1.default.object({
    elementId: Zod_1.default.string().min(1),
    spaceId: Zod_1.default.string(),
    x: Zod_1.default.number(),
    y: Zod_1.default.number()
});
exports.CreateElementSchema = Zod_1.default.object({
    imageUrl: Zod_1.default.string().min(1),
    width: Zod_1.default.number(),
    height: Zod_1.default.number(),
    static: Zod_1.default.boolean()
});
exports.UpdateElementSchema = Zod_1.default.object({
    imageUrl: Zod_1.default.string(),
});
exports.CreateAvatarSchema = Zod_1.default.object({
    imageUrl: Zod_1.default.string(),
    name: Zod_1.default.string()
});
exports.CreateMapSchema = Zod_1.default.object({
    thumbnail: Zod_1.default.string(),
    dimensions: Zod_1.default.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    defaultElements: Zod_1.default.array(Zod_1.default.object({
        elementId: Zod_1.default.string(),
        x: Zod_1.default.number(),
        y: Zod_1.default.number(),
    }))
});
