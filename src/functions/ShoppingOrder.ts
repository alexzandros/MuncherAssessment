import { APIGatewayProxyHandler } from "aws-lambda"
import { PrismaClient } from "@prisma/client"


export const createShoppingOrder: APIGatewayProxyHandler = async (event, _context) => {
    return {
        statusCode:200,
        body:""
    }
}