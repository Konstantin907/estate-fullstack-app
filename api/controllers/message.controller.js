import prisma from "../lib/prisma.js";

export const getMessages = async(req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
 try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userIDs: { hasSome: [tokenUserId] },
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
      },
    },
    });
        if(!chat) return res.status(404).json({message: "Chat not found!"});
    const userIds = [...new Set(chat.messages.map(m => m.userId))];

    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, email: true, avatar: true },
    });

    const messagesWithUsers = chat.messages.map((msg) => ({
      ...msg,
      user: users.find((u) => u.id === msg.userId) || null,
    }));
        res.status(200).json(messagesWithUsers);

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
                lastMessage: text,
                seenBy: { set:[tokenUserId] },
            }
        });
            const user = await prisma.user.findUnique({
              where: { id: tokenUserId },
              select: { id: true, username: true, email: true, avatar: true },
            });

        
    res.status(200).json({...message, user});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send message!" });
    }
}