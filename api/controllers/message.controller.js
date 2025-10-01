import prisma from "../lib/prisma.js";

export const getMessages = async(req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    try {
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{
                    hasSome: [tokenUserId],
                },
                include: {
                    messages: {
                        orderBy: { createdAt: "asc" }
                    },
                },
            },
        });

        if(!chat) return res.status(404).json({message: "Chat not found!"});

        res.status(200).json(chat.messages);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to add messages!"})
    }
}

export const addMessage = async(req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const { text } = req.body;

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                userIDs: {hasSome: [tokenUserId]},
            },
        });

        if(!chat) {
            return res.status(404).json({ message: "Chat not found!" });
        }

        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId: tokenUserId
            },
        });

        await prisma.chat.update({
            where: {id: chatId},
            data: {
                seenBy: { set:[tokenUserId] },
                lastMessage: text,
            }
        });
        
    res.status(200).json(message);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send message!" });
    }
}