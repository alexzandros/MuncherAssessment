export type moneyTransferRequestData = {
    senderId: string
    receiverId: string
    amount: number
}

export type OrderCreationRequestData = {
    userId: string
    products: {
        productId: string,
        quantity: number
    }[]
}
