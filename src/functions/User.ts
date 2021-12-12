import { APIGatewayProxyHandler } from "aws-lambda"
// import "source-map-support/register";
import * as Database from "@utilities/Database"
import { moneyTransferRequestData } from "@utilities/Types"

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
    const newBalance = user.balance.plus(amount)
    const newUser =  await Database.updateUserBalance(userId, newBalance)
    return {
        statusCode: 202,
        body: JSON.stringify({
            message:"User balance updated",
            data: newUser
        })
    }
}

export const transferMoneyBetweenTwoUsers: APIGatewayProxyHandler = async (event, _context) => {
    if (!event.body){
        return {
            statusCode:400,
            body: JSON.stringify({message:"Request body empty"})
        }
    }
    const transferData: moneyTransferRequestData = JSON.parse(event.body)
    const sender = await Database.selectUser(transferData.senderId)
    if (!sender){
        return {
            statusCode:404,
            body: JSON.stringify({message:"User with given email not found"})
        }
    }
    const receiver = await Database.selectUser(transferData.receiverId)
    if (!receiver){
        return {
            statusCode:404,
            body: JSON.stringify({message:"User with given email not found"})
        }
    }
    if (sender.balance.lessThan(transferData.amount)){
        return {
                statusCode:406,
                body: JSON.stringify({message:"Insufficient Funds"})
        }
    }
    const newSenderBalance = sender.balance.minus(transferData.amount)
    const newReceiverBalance = receiver.balance.plus(transferData.amount)
    const newSender = await Database.updateUserBalance(sender.email, newSenderBalance)
    const newReceiver = await Database.updateUserBalance(receiver.email, newReceiverBalance)
    return {
        statusCode: 202,
        body: JSON.stringify({
            message: "Money Transfer accepted",
            data: [newSender, newReceiver]
        })
    }
    
}