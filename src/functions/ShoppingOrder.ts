import { APIGatewayProxyHandler } from "aws-lambda"
import { Decimal } from "@prisma/client/runtime"
import * as Database from "@utilities/Database"
import { OrderCreationRequestData } from "@utilities/Types"

export const createShoppingOrder: APIGatewayProxyHandler = async (event, _context) => {
    if (!event.body){
        return {
            statusCode:400,
            body: JSON.stringify({message:"Request body empty"})
        }
    }
    const orderData: OrderCreationRequestData = JSON.parse(event.body)
    const user = await Database.selectUser(orderData.userId)
    if (!user){
        return{
            statusCode:404,
            body: JSON.stringify({message: "User with given email not found"})
        }
    }
    const productIds = orderData.products.map(product => product.productId)
    const products = await Database.selectProdusctsById(productIds)
    if (productIds.length !== products.length){
        return{
            statusCode: 400,
            body: JSON.stringify({message:"Wrong product Ids"})
        }
    }
    const orderTotal = products.reduce(
        (accum, current, idx) => 
            accum.plus(current.unitPrice.times(orderData.products[idx].quantity)), 
        new Decimal(0))
    if (user.balance.lessThan(orderTotal)){
        return {
            statusCode:406,
            body: JSON.stringify({message:"Insufficient Funds"})
        }
    }
    const orderToSave = {
        userId: user.email,
        total:orderTotal,
    }
    const newBalance = user.balance.minus(orderTotal)
    const order = await Database.insertShoppingOrder(orderToSave)
    const details = products.map(
        (product, idx) => {
            const quantity = orderData.products[idx].quantity
            const total = product.unitPrice.times(quantity)
            return {
                orderId: order.id,
                productId: product.productId,
                quantity: quantity,
                total: total
            }})
    const detailsResponse = await Database.insertOrderDetails(details)
    const newUser = await Database.updateUserBalance(user.email, newBalance)
    return {
        statusCode:201,
        body:JSON.stringify({
            message: "Shopping order created",
            data: {
                user: newUser,
                numberOfItems: detailsResponse.count,
                orderTotal: order.total
            }
        })
    }
}