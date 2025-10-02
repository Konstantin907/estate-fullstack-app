import prisma from '../lib/prisma.js'

export const getChats = async (req, res) => {
    const tokenUserId = req.userId
    try {
        const chats = await prisma.chat.findMany({
            where:{
               userIDs:{
                hasSome:[tokenUserId]
               },
            },
            orderBy: { createdAt: "desc" }
        });
        const allUserIds = [...new Set(chats.flatMap(c=>c.userIDs))];

        // all users we need both sides: 
        const users = await prisma.user.findMany({
          where:{  id: { in: allUserIds } },
          select: { id: true, username: true, avatar: true, email:true }
        })

        // other user in chat:
        const chatsWithOtherUser = chats.map(chat=>{
          const otherUser = users.find(u => u.id !== tokenUserId && chat.userIDs.includes(u.id));
          return { ...chat, otherUser };
        })

        res.status(200).json(chatsWithOtherUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to get chats' });
    }
  };

  export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
  
    try {
            const singleChat = await prisma.chat.findFirst({
                where:{
                    id: req.params.id,
                    userIDs:{
                        hasSome: [tokenUserId],
                    },
                },
                include:{
                    messages:{
                        orderBy:{
                            createdAt: "asc",
                        },
                    }
                }
            })

            if (!singleChat) {
              return res.status(404).json({ message: "Chat not found" });
            }

            const users = await prisma.user.findMany({
            where: { id: { in: singleChat.userIDs } },
            select: { id: true, username: true, email: true, avatar: true },
            });

            await prisma.chat.update({
                where:{
                    id: req.params.id,
                },
                data:{
                    seenBy:{
                        push: [tokenUserId]
                    }
                }
            })
        res.status(200).json({ ...singleChat, users });
       
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to get chats' });
    }
  };


export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;

  try {
    if (!receiverId) {
      return res.status(400).json({ message: "receiverId is required" });
    }
    if (receiverId === tokenUserId) {
      return res.status(400).json({ message: "You cannot chat with yourself" });
    }
    const existingChat = await prisma.chat.findFirst({
      where: {
        userIDs: { hasEvery: [tokenUserId, receiverId] },
      },
    });

    if (existingChat) {
      const otherUser = await prisma.user.findUnique({
        where: { id: receiverId },
        select: { id: true, username: true, avatar: true, email: true },
      });
      return res.status(200).json({ ...existingChat, otherUser });
    }
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
      },
    });

    const otherUser = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { id: true, username: true, avatar: true, email: true },
    });

    res.status(200).json({ ...newChat, otherUser });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create chat" });
  }
};

  export const readChat = async (req, res) => {
    const tokenUserId = req.userId;

        try {
            const chat = await prisma.chat.findFirst({
            where: {
                id: req.params.id,
                userIDs: { hasSome: [tokenUserId] },
            },
            });

            if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
            }
            const updatedChat = await prisma.chat.update({
            where: { id: req.params.id },
            data: {
                seenBy: { push: tokenUserId },
                seenBy: { set: [...chat.seenBy, tokenUserId] },
            },
            });
            
            res.status(200).json(updatedChat);
        } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get chats' });
        }
  };
  

