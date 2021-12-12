import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime"

const prisma = new PrismaClient()

export const updateUserBalance = async  (email: string, balance: Decimal) => {
    const user = await prisma.user.update({where:{email: email}, data:{balance}})
    await prisma.$disconnect()
    return user
}

export const selectUser = async (email: string) => {
    const user = await prisma.user.findUnique({where: {email}})
    await prisma.$disconnect()
    return user
}

export const insertUser = async(userData: any) => {
    const user =  await prisma.user.create({data: userData})
    await prisma.$disconnect()
    return user
}

export const selectAllUsers = async () => {
    const users = await prisma.user.findMany()
    await prisma.$disconnect()
    return users
}

export const selectAllProducts = async () => {
    const products =  await prisma.product.findMany()
    await prisma.$disconnect()
    return products
}

export const selectProdusctsById = async (productIds: string[]) => {
    const products = await  prisma.product.findMany(
        {
            where:{
                productId: {
                    in: productIds
                }
            }
        })
    await prisma.$disconnect()
    return products
}

export const insertShoppingOrder = async (orderData: any) => {
    const order =  await prisma.shoppingOrder.create({data:orderData})
    await prisma.$disconnect()
    return order
}

export const insertOrderDetails = async (orderDetails: any) => {
    const detailsResponse =   await prisma.orderDetail.createMany({data: orderDetails})
    await prisma.$disconnect()
    return detailsResponse
}