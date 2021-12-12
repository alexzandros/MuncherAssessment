import { APIGatewayProxyHandler } from "aws-lambda"
import { PrismaClient } from "@prisma/client"
import * as Database from "@utilities/Database"


export const getProducts: APIGatewayProxyHandler = async (_event, _context ) => {
    const products = await Database.selectAllProducts()
    return {statusCode:200, body:JSON.stringify(products)}
}
