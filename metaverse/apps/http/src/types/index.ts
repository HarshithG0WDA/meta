import z from "Zod";

export const SignupSchema = z.object({
    username : z.string(),
    password : z.string().min(8),
    type : z.enum(["user","admin"]),
})

export const SigninSchema = z.object({
    username : z.string(),
    password : z.string().min(8)
})

export const UpdateMetadataSchema = z.object({
    avatarId : z.string().min(1),
})

//dimensions in the below schema is being validated using regex, WKT it should be something like 100x100 so we do a expression matching of 4 digits x 4 digits
export const CreateSpaceSchema = z.object({
    name : z.string().min(1),
    dimensions : z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    mapId : z.string().min(1)
})

export const AddElementSchema = z.object({
    elementId : z.string().min(1),
    spaceId : z.string(),
    x : z.number(),
    y : z.number()
})

export const CreateElementSchema = z.object({
    imageUrl : z.string().min(1),
    width : z.number(),
    height : z.number(),
    static : z.boolean()
})

export const UpdateElementSchema = z.object({
    imageUrl : z.string(),
})

export const CreateAvatarSchema = z.object({
    imageUrl : z.string(),
    name : z.string()
})

export const CreateMapSchema = z.object({
    thumbnail : z.string(),
    dimensions : z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    defaultElements : z.array(z.object({
    elementId : z.string(),
    x : z.number(),
    y : z.number(),
    }))
})
