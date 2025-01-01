import { Router } from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { SigninSchema, SignupSchema } from "../../types";
import { PrismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import {hash, compare} from "../../scrypt";

export const router = Router();
const client = new PrismaClient();

router.post("/signup", async(req,res) => {
    const parsedData = SignupSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({message : "Validation Failed"})
        return
    }
    const hashedPassword = await hash(parsedData.data.password)
    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username,
                password : hashedPassword
            },
        });

        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }

        const isValid = await compare(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Incorrect password" });
            return;
        }

        res.json({ message: "Login successful" });
    } catch (e) {
        res.status(400).json({ message: "Something went wrong"});
    }
});

router.post("/signin", async(req,res) => {
    const parsedData = SigninSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({message : "Validation Failed"})
        return
    }
    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username,
            },
        })
        if (!user) {
            res.status(403).json({ message: "User not found" })
            return
        }
        const isValid = await compare(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Incorrect password" })
            return
        }

        const token = jwt.sign({
            userId : user.id,
            role : user.role
        }, JWT_PASSWORD);

        res.json({
            token
        })
    }
    catch{

    }
})

router.get("/elements", (req,res) => {

})

router.get("/avatars",(req,res) => {

})

router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/space", spaceRouter)