import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime"

const prisma = new PrismaClient()

export const updateUserBalance = async  (email: string, balance: Decimal) => {
    const user = await prisma.user.update({where:{email: email}, data:{balance}})
    prisma.$disconnect()
    return user
}

export const selectUser = async (email: string) => {
    const user = await prisma.user.findUnique({where: {email}})
    prisma.$disconnect()
    return user
}

export const deleteUser = async (email: string) => {
    const deleteUserResponse = await prisma.user.deleteMany({where: {email}})
    prisma.$disconnect()
    return deleteUserResponse
}

export const insertUser = async(userData: any) => {
    const user =  await prisma.user.create({data: userData})
    prisma.$disconnect()
    return user
}

export const selectAllUsers = async () => {
    const users = await prisma.user.findMany()
    prisma.$disconnect()
    return users
}

export const selectAllProducts = async () => {
    const products =  await prisma.product.findMany()
    prisma.$disconnect()
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
    prisma.$disconnect()
    return products
}

export const deleteShoppingOrders = async() => {
    const response = await prisma.shoppingOrder.deleteMany()
    prisma.$disconnect()
    return response
}

export const insertShoppingOrder = async (orderData: any) => {
    const order =  await prisma.shoppingOrder.create({data:orderData})
    prisma.$disconnect()
    return order
}

export const deleteOrderDetails = async() => {
    const response = await prisma.orderDetail.deleteMany()
    prisma.$disconnect()
    return response
}


export const insertOrderDetails = async (orderDetails: any) => {
    const detailsResponse =   await prisma.orderDetail.createMany({data: orderDetails})
    prisma.$disconnect()
    return detailsResponse
}

