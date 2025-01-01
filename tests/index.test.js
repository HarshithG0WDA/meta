const { default: axios } = require("axios");

const BACKEND_URL = "http://localhost:3000"
const WS_URL = "ws://localhost:30001"

function sum(a,b){
    return a+b
}

//describe blocks

describe("Authentication", () => {
    test ('user is able to sign-up and only once', async () => {
        const username = "harshith" + Math.random();
        const password = "123456";
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type : "admin"
        })

        expect(response.statusCode).toBe(200)
        
        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type : "admin"
        })
        expect(updatedResponse.statusText).toBe(400);
    });

    test ("Signup request fails if username is empyt",  async() => {
        const username = ""
        const password = "123456"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type : "admin"
        })
        expect(response.statusCode).toBe(400)

        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            password
        })
        expect(response.statusCode).toBe(400)
    })

    test ("Sigin successfull if the username and password are correct", async() => {
        const username = `harshith-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type : "admin",
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })

        expect (response.statusCode).toBe(200)
        expect(response.body.token).toBeDefined()

    })
    test ("Signin fails if username or password is incorrect",async() => {
        const username = `harshith-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type : "admin",
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password : `${Math.random()}`
        })
        expect(response.statusCode).toBe(403)
        
        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username : `${Math.random()}`,
            password
        })
        expect(updatedResponse.statusCode).toBe(403)
    })

});

// describe("User meta-data endpoints", () => {
    
//     let token = "";
//     let avatarId = "";

//     beforeAll(async () => {
//         const username = `harshith-${Math.random()}`
//         const password = "123456"

//         await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type : "admin"
//         })

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
        
//         //token = response.token() => {authorization : "Bearer asdasda__uhershuhasntuh"}\

//         token = response.data.token

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
//             "imageUrl" : "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "name" : "Timmy"
//         },{
//             headers : {
//                 "authorization" : `Bearer ${token}`
//             }
//         })

//         avatarId = avatarResponse.data.avatarId;
//     })

        
//         test("User can't update their metadata", async () => {
//             const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//                 avatarId : "123123123213"
//             })
//             expect(response).statusCode.toBe(400)
//         })

//         test("User can update their metadata with right avatarID", async() => {
//             const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//                 avatarId
//             }, {
//                 headers : {
//                     "authorization" : `Bearer ${token}`
//                 }
//             })
//             expect(response).statusCode.toBe(200)
//         })

//         test("User is not able to update metadata if there is no / wrong autho id", async() => {
//             const response = await axios.post(`${BACKEND_URL}/api/v1/metadata`,{
//                 avatarId
//            })
//            expect(response).statusCode.toBe(403)
//         })
// })

// describe("User avatar informationt" , () => {
//     let token = "";
//     let avatarId = "";
//     let userId = "";

//     beforeAll(async () => {
//         const username = `harshith-${Math.random()}`
//         const password = "123456"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type : "admin"
//         })

//         userId = signupResponse.data.userId

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })

//         token = response.data.token;

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
//             "imageUrl" : "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "name" : "Timmy"
//         },{
//             headers : {
//                 "authorization" : `Bearer ${token}`
//             }
//         })
    
//         avatarId = avatarResponse.data.avatarId;
//     })
    
//     test("Get back avatar information for a user", async() => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`);

//         expect(response.data.avatars.length).toBE(1);
//         expect(response.data.avatars[0].userId).toBe(userId);
//     })

//     test("Get avatars list that are available", async() => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
//         expect(response.data.avatars.length).not.toBe(0);
//         const currentAvatar = response.data.avatars.find(x => x.id === avatarId);
//         expect(currentAvatar).toBeDefined()
//     })
// })

// describe("Space Information" , () => {
//     let mapId
//     let element1Id
//     let element2Id
//     let adminToken 
//     let adminId
//     let userId

//     beforeAll(async () => {
//         const username = `harshith-${Math.random()}`
//         const password = "123456"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type : "admin"
//         })
        
//         adminId = signupResponse.data.userId
        
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
        
//         adminToken = response.data.token;
        
//         const username2 = `harshith-${Math.random()}-user`
//         const password2 = "123456"

//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username2,
//             password2,
//             type : "user"
//         })
        
//         userId = userSignupResponse.data.userId
        
//         const userResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
        
//         userToken = userResponse.data.token;

//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl" :  "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "width" : 1,
//             "height" : 1,
//             "static" : true
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//              }
//         })
//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
//             imageUrl : "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "width" : 1,
//             "height" : 1,
//             "static" : true
//         },{
//             headers : {
//                 "authorization" : `Beare ${adminToken}`
//             }
//         })
//         element1Id = element1.data.id
//         element2Id = element2.data.id

//         const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
//             "thumbnail" : "https://thumbnail.com/a.png",
//             "dimensions" : "100x200",
//             "defaultElements" : [{
//                 elementId : element1Id,
//                 x : 20,
//                 y : 20
//             }, {
//                 elementId : element2Id,
//                 x : 18,
//                 y : 20
//             }]
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//             }
//         })
//         mapId = map.id
//     })

//     test("User is able to create a space with map id", async() => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name" : "test",
//             "dimentions" : "100x200",
//             "mapId" : mapId
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })
//         expect(response.data.spaceId).toBeDefined()
//     })

//     test("User is not able to create a space without map id and dimensions", async() => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name" : "test",
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test("User is not able to delete a random space that doesn't exist", async() => {
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/randomIdDoesntExist`, {
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test("User is ablet to delete a space that exists", async() => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name" : "test",
//             "dimentions" : "100x200",
//             "mapId" : mapId
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })
//         const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })
//         expect(deleteResponse.statusCode).toBe(200)
//     })

//     test("User should not be able to delete another user's space", async() => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name" : "test",
//             "dimentions" : "100x200",
//             "mapId" : mapId
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })
//         const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//             }
//         })
//         expect(deleteResponse.statusCode).toBe(400)

//     })

//     test("Admin has no spaces initially", async() => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
//         expect(response.data.spaces.length).toBe(0);
//     },{
//         headers : {
//             "authorization" : `Bearer ${adminToken}`
//         }
//     })

//     test("Admin creates spaces", async() => {
//         const createSpaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space/all`,{
//             "name" : "Test",
//             "dimensions" : "100x200"
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//             }
//         })
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
//         const filteredSpace = response.data.spaces.find(x=> x.id == createSpaceResponse.spaceId)
//         expect(response.data.spaces.length).toBe(1)
//         expect(filteredSpace).toBeDefined()
//     })
// })

// describe("Arena endpoints", () => {
//     let mapId
//     let element1Id
//     let element2Id
//     let adminToken 
//     let adminId
//     let userId
//     let userToken
//     let spaceId

//     beforeAll(async () => {
//         const username = `harshith-${Math.random()}`
//         const password = "123456"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type : "admin"
//         })
        
//         adminId = signupResponse.data.userId
        
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
        
//         adminToken = response.data.token;
        
//         const username2 = `harshith-${Math.random()}-user`
//         const password2 = "123456"

//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username2,
//             password2,
//             type : "user"
//         })
        
//         userId = userSignupResponse.data.userId
        
//         const userResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
        
//         userToken = userResponse.data.token;
//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl" :  "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "width" : 1,
//             "height" : 1,
//             "static" : true
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//              }
//         })
//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
//             imageUrl : "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "width" : 1,
//             "height" : 1,
//             "static" : true
//         },{
//             headers : {
//                 "authorization" : `Beare ${adminToken}`
//             }
//         })
//         element1Id = element1.data.id
//         element2Id = element2.data.id

//         const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
//             "thumbnail" : "https://thumbnail.com/a.png",
//             "dimensions" : "100x200",
//             "defaultElements" : [{
//                 elementId : element1Id,
//                 x : 20,
//                 y : 20
//             }, {
//                 elementId : element2Id,
//                 x : 18,
//                 y : 20
//             }]
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//             }
//         })

//         mapId = map.id
        
//         const space = await axios.post(`${BACKEND_URL}/api/v1/`, {
//             "name" : "Test",
//             "dimensions" : "100x200",
//             "mapId" : mapId
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })

//         spaceId = space.Id
//     })

//     test("Incorrect spaceId returns status code 400", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/asethutsatehuso`,{
//             headers : {
//                 authorization : `Bearer ${userToken}`
//             }
//         });

//         expect(response.statusCode).toBe(400)
//     })

//     test("Correct spaceId returns all the elements", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         });

//         expect(response.data.dimensions).toBe("100x200")
//         expect(response.data.elements.length).toBe(3)
//     })

//     test("Delete endpoint is able to delete an element", async () => {
//         const elementResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`);
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/element`,{
//             spaceId : spaceId,
//             elementId : elementResponse.data.elements[0].id
//         },{
//             headers : {
//                 'authorization' : `Bearer ${userToken}`
//             }
//         });

//         const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`);

//         expect(newResponse.data.elements.length).toBe(2)
//     })

//     test("Adding an element to the space", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
//             "elementId" : element1Id,
//             "spaceId" : spaceId,
//             "x" : 50,
//             "y" : 20
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })

//         const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`)

//         expect(newResponse.data.elements.length).toBe(3)
//     })

//     test("Adding an element fails if you exceed the canvas limits", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
//             "elementId" : element1Id,
//             "spaceId" : spaceId,
//             "x" : 1000,
//             "y" : 2000
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })

//         const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`)

//         expect(newResponse.statusCode).toBe(400)
//     })
// })

// describe("Create an element", () => {
//     let adminToken;
//     let adminId;
//     let userId;
//     let userToken;

//     beforeAll(async () => {
//         const username = `harshith-${Math.random()}`;
//         const password = "123456";

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin",
//         });

//         adminId = signupResponse.data.userId;

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password,
//         });

//         adminToken = response.data.token;

//         const username2 = `harshith-${Math.random()}-user`;
//         const password2 = "123456";

//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username2,
//             password: password2,
//             type: "user",
//         });

//         userId = userSignupResponse.data.userId;

//         const userResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: username2,
//             password: password2,
//         });

//         userToken = userResponse.data.token;
//     });

//     test("User is not able to access all admin endpoints", async () => {
//         const element1 = await axios
//             .post(
//                 `${BACKEND_URL}/api/v1/admin/element`,
//                 {
//                     "imageUrl" :
//                         "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//                     width: 1,
//                     height: 1,
//                     static: true,
//                 },
//                 {
//                     headers: {
//                         "authorization": `Bearer ${userToken}`,
//                     },
//                 }
//             )
//             .catch((err) => err.response);

//         const createAvatar = await axios
//             .post(
//                 `${BACKEND_URL}/api/v1/admin/avatar`,
//                 {
//                     imageUrl: "https://google.com/cat.png",
//                 },
//                 {
//                     headers: {
//                         "authorization": `Bearer ${userToken}`,
//                     },
//                 }
//             )
//             .catch((err) => err.response);

//         expect(createAvatar.status).toBe(403);
//         expect(element1.status).toBe(403);
//     });

//     test("Admin is able to access all admin endpoints", async () => {
//         const element1 = await axios.post(
//             `${BACKEND_URL}/api/v1/admin/element`,
//             {
//                 "imageUrl" :
//                     "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//                 width: 1,
//                 height: 1,
//                 static: true,
//             },
//             {
//                 headers: {
//                     "authorization": `Bearer ${adminToken}`,
//                 },
//             }
//         );

//         const createAvatar = await axios.post(
//             `${BACKEND_URL}/api/v1/admin/avatar`,
//             {
//                 "imageUrl" : "https://google.com/cat.png",
//             },
//             {
//                 headers: {
//                     "authorization": `Bearer ${adminToken}`,
//                 },
//             }
//         );

//         expect(createAvatar.status).toBe(200);
//         expect(element1.status).toBe(200);
//     });

//     test("Admin is able to update the image url for an element", async () => {
//         const createElementResponse = await axios.post(
//             `${BACKEND_URL}/api/v1/admin/element`,
//             {
//                 imageUrl:
//                     "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//                 width: 1,
//                 height: 1,
//                 static: true,
//             },
//             {
//                 headers: {
//                     "authorization": `Bearer ${adminToken}`,
//                 },
//             }
//         );

//         const elementId = createElementResponse.data.id;

//         const updateElementResponse = await axios.put(
//             `${BACKEND_URL}/api/v1/admin/element/${elementId}`,
//             {
//                 "imageUrl" : "https://google.com/cat.png",
//             },
//             {
//                 headers: {
//                     "authorization" : `Bearer ${adminToken}`,
//                 },
//             }
//         );

//         expect(updateElementResponse.status).toBe(200);
//     });
// });

// describe("Websocket tests",() => {
//     let adminToken;
//     let adminId;
//     let userToken;
//     let userId;
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let spaceId;
//     let ws1;
//     let ws2;
//     let ws1Messages = [];
//     let ws2Messages = [];
//     let userX;
//     let userY;
//     let adminX;
//     let adminY;

//     async function waitForAndPopulateMessage(messageArray){
//         return new Promise(r => {
//             if(messageArray.length > 0){
//                 resolve(messageArray.shift())
//             } else {
//                 let interval = setInterval(() => {
//                     if(messageArray.length > 0){
//                         resolve(messageArray.shift())
//                         clearInterval(interval)
//                     }
//                 },100)

//             }
//         })
//     }

//     async function setupHTTP(){
//         const username = `harshith-${Math.random()}`
//         const password = "123456" 
//         const adminSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, { 
//             username,
//             password,
//             role : "admin"
//         })
//         const adminSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
//         adminToken = adminSigninResponse.data.token
//         adminId = adminSignupResponse.data.id;

//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, { 
//             username : username + "-user",
//             password,
//             role : "user"
//         })
//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username : username + "-user",
//             password
//         })
//         userToken = adminSigninResponse.data.token
//         userId = adminSignupResponse.data.id;

//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl" :  "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "width" : 1,
//             "height" : 1,
//             "static" : true
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//              }
//         })
//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
//             imageUrl : "https://devforum-uploads.s3.us-east-2.amazonaws.com/uploads/original/4X/9/a/1/9a177257afcf8d48ffb699bf7f7dda8fc546a654.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATSAZKDNRF74OVZGC%2F20241227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241227T050703Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7a730c352abb8d1bd0c28d36160599408405630e0012d8fdca06e1e49e6bd230",
//             "width" : 1,
//             "height" : 1,
//             "static" : true
//         },{
//             headers : {
//                 "authorization" : `Beare ${adminToken}`
//             }
//         })
//         element1Id = element1.data.id
//         element2Id = element2.data.id

//         const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
//             "thumbnail" : "https://thumbnail.com/a.png",
//             "dimensions" : "100x200",
//             "defaultElements" : [{
//                 elementId : element1Id,
//                 x : 20,
//                 y : 20
//             }, {
//                 elementId : element2Id,
//                 x : 18,
//                 y : 20
//             }]
//         },{
//             headers : {
//                 "authorization" : `Bearer ${adminToken}`
//             }
//         })

//         mapId = map.id
        
//         const space = await axios.post(`${BACKEND_URL}/api/v1/`, {
//             "name" : "Test",
//             "dimensions" : "100x200",
//             "mapId" : mapId
//         },{
//             headers : {
//                 "authorization" : `Bearer ${userToken}`
//             }
//         })

//         spaceId = space.Id

//     }

//     async function setupWs(){
//         ws1 = new WebSocket(WS_URL);
        
//         await new Promise(r => {
//             ws1.onopen = r
//         })

//         ws1.onmessage = (event) => {
//             ws1Messages.push(JSON.parse(event.data))
//         }
        
//         ws2 = new WebSocket(WS_URL);

//         await new Promise(r => {
//             ws2.onopen = r
//         })
        
//         ws2.onmessage = (event) => {
//             wss2Messages.push(JSON.parse(event.data))
//         }
//     }

//     beforeAll(() => {
//         setupHTTP();
//         setupWs();
//     })
//     test("Get backe ack for joining the space", async() => {
//         ws1.send(JSON.stringify({
//             "type" : "join",
//             "payload" : {
//                 "spaceId" : spaceId,
//                 "token" : adminToken
//             }
//         }))

//         const message1 = await waitForAndPopulateMessage(ws1Messages);

//         ws2.send(JSON.stringify({
//             "type" : "join",
//             "payload" : {
//                 "spaceId" : spaceId,
//                 "token" : userToken
//             }
//         }))

//         const message2 = await waitForAndPopulateMessage(ws2Messages);
//         const message3 = await waitForAndPopulateMessage(ws1Messages)

//         expect(message1.type).toBe("space-joined")
//         expect(message2.type).toBe("space-joined")
//         expect(message3.type).toBe("user-join")
//         expect(message3.payload.x).toBe(message2.payload.spawn.x)
//         expect(message3.payload.y).toBe(message2.payload.spawn.y)
//         expect(message3.payload.userId).toBe(userId)

//         expect(message1.payload.users.length ).toBe(0)
//         expect(message2.payload.users.length).toBe(1)
//         adminX = message1.payload.spawn.x
//         adminY = message1.payload.spawn.y

//         userX = message2.payload.spawn.x
//         userY = message2.payload.spawn.y
//     })

//     test("User should not be able to move across two blocks simultaneously", async() => {
//         ws1.send(JSON.stringify({
//             type : "movement",
//             payload : {
//                 x : adminX + 2,
//                 y : adminY
//             }
//         }))
//         const message = await waitForAndPopulateMessage(ws1Messages);
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("correct movement should be broadcasted to other sockets in nteh server", async() => {
//         ws1.send(JSON.stringify({
//             type : "movement",
//             payload : {
//                 x : adminX + 1,
//                 y : adminY,
//                 userId : adminId
//             }
//         }))
//         const message = await waitForAndPopulateMessage(ws2Messages);
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX + 1 )
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("if a user leaves the server, other should recieve a leave event", async() => {
//         ws1.close()
//         const message = await waitForAndPopulateMessage(ws2Messages);
//         expect(message.type).toBe("user-left")
//         expect(message.payload.userId).toBe(adminId)
//     })
// })