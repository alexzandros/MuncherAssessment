import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime"

export const updateUserBalance = async  (email: string, balance: Decimal) => {
    const prisma = new PrismaClient()
    await prisma.user.update({where:{email: email}, data:{balance}})
}

export const selectUser = async (email: string) => {
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({where: {email}})
    return user
}

export const insertUser = async(userData: any) => {
    const prisma = new PrismaClient()
    await prisma.user.create({data: userData})
}

export const selectAllUsers = async () => {
    const prisma = new PrismaClient()
    return await prisma.user.findMany()
}