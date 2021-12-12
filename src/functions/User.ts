import { Decimal } from "@prisma/client/runtime"
import { APIGatewayProxyHandler } from "aws-lambda"
// import "source-map-support/register";
import * as Database from "@utilities/Database"

export const getUsers: APIGatewayProxyHandler = async (_event, _context ) => {
    
    const users = await Database.selectAllUsers()
    return{
        statusCode: 200,
        body:JSON.stringify(users)
    }
}

export const createUser: APIGatewayProxyHandler = async (event, _context) => {
    if (!event.body){
        return {
            statusCode:400,
            body: JSON.stringify({message:"Request body empty"})
        }
    }
    const userData = JSON.parse(event.body)
    const userExists = await Database.selectUser(userData.email)
    if (userExists){
        return {
            statusCode:406,
            body: JSON.stringify({message:"Email address already registered"})
        }
    }
    await Database.insertUser(userData)
    
    return{
        statusCode:201,
        body: JSON.stringify({message: "User created"})
    }
}

export const increaseUserBalance: APIGatewayProxyHandler = async (event, _context) => {
    if (!event.queryStringParameters){
        return{
            statusCode: 400,
            body: JSON.stringify({message: "Querystring parameters missing"})
        }
    }
    let {userId, amount} = event.queryStringParameters
    if (!userId){
        return{
            statusCode: 400,
            body: JSON.stringify({message: "userId parameter missing"})
        }
    }
    if (!amount){
        return{
            statusCode: 400,
            body: JSON.stringify({message: "balance parameter missing"})
        }
    }
    const user  = await Database.selectUser(userId)
    if(!user){
        return{
            statusCode: 404,
            body: JSON.stringify({message: "User with given email not found"})
        }
    }
    const newBalance = Decimal.sum(user.balance, amount)
    await Database.updateUserBalance(userId, newBalance)
    return {
        statusCode: 202,
        body: JSON.stringify({message:"User balance updated"})
    }
}
    
// const updateUserBalance = async  (email: string, balance: Decimal) => {
//     const prisma = new PrismaClient()
//     await prisma.user.update({where:{email: email}, data:{balance}})
// }

// const selectUser = async (email: string) => {
//     const prisma = new PrismaClient()
//     const user = await prisma.user.findUnique({where: {email}})
//     return user
// }

// const insertUser = async(userData: any) => {
//     const prisma = new PrismaClient()
//     await prisma.user.create({data: userData})
// }

// const selectAllUsers = async () => {
//     const prisma = new PrismaClient()
//     return await prisma.user.findMany()
// }