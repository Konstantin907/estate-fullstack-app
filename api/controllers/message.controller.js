import prisma from "../lib/prisma.js";

export const getMessages = async(req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;
    try {
        //if chat belongs to us:
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{
                    hasSome: [tokenUserId],
                }
            }
        });
        if(!chat) return res.status(404).json({message: "Chat not found!"});

        const message = await prisma.message.create({
            data:{
                text,
                chatId,
                userId: tokenUserId,
            }
        });

        //updating seenBy:
        await prisma.chat.update({
            where:{
                id: chatId
            },
            data:{
                seenBy:{tokenUserId},
                lastMessage: text,
            }
        })

        res.status(200).json(message);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to add messages!"})
    }
}