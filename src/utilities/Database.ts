import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime"

const prisma = new PrismaClient()

export const updateUserBalance = async  (email: string, balance: Decimal) => {
    return await prisma.user.update({where:{email: email}, data:{balance}})
}

export const selectUser = async (email: string) => {
    const user = await prisma.user.findUnique({where: {email}})
    return user
}

export const insertUser = async(userData: any) => {
    return await prisma.user.create({data: userData})
}

export const selectAllUsers = async () => {
    return await prisma.user.findMany()
}

export const selectAllProducts = async () => {
    return await prisma.product.findMany()
}

export const selectProdusctsById = async (productIds: string[]) => {
    const products = await  prisma.product.findMany(
        {
            where:{
                productId: {
                    in: productIds}}})
    return products
}

export const insertShoppingOrder = async (orderData: any) => {
    return await prisma.shoppingOrder.create({data:orderData})
}

export const insertOrderDetails = async (orderDetails: any) => {
    return  await prisma.orderDetail.createMany({data: orderDetails})
}