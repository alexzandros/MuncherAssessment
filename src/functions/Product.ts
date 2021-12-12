import { APIGatewayProxyHandler } from "aws-lambda"
import { PrismaClient } from "@prisma/client"

export const getProducts: APIGatewayProxyHandler = async (_event, _context ) => {
    const prisma = new PrismaClient()
    const products = await prisma.product.findMany()
    return {statusCode:200, body:JSON.stringify(products)}
}
