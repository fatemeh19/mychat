export default async (withMessages,userChat)=>{
    if(withMessages){
        return [{
            $unwind: "$messages",
          },
          {
            $lookup: {
              from: "messages",
              localField: "messages.messageInfo",
              foreignField: "_id",
              as: "messages.messageInfo",
            },
          },
          {
            $unwind: "$messages.messageInfo",
          },
          {
            $group: {
              _id: "$_id",
              groupTypeSetting: { $first: "$groupTypeSetting" },
              name: { $first: "$name" },
              profilePic: { $first: "$profilePic" },
              owner: { $first: "$owner" },
              userPermissionsAndExceptions: {
                $first: "$userPermissionsAndExceptions",
              },
              members: { $first: "$members" },
              chatType: { $first: "$chatType" },
              notifications: { $first: "$notifications" },
              pinnedMessages: { $first: "$pinnedMessages" },
      
              messages: { $push: "$messages" },
            },
          },
          {
            $project: {
              groupTypeSetting: 1,
              name: 1,
              profilePic: 1,
              owner: 1,
              userPermissionsAndExceptions: 1,
              chatType: 1,
              notifications: 1,
              pinnedMessages: 1,
              messages: 1,
              messages: {
                $filter: {
                  input: "$messages",
                  as: "message",
                  cond: {
                    $gte: ["$$message.messageInfo.createdAt", userChat.addedAt],
                  },
                },
              },
            },
          },
          {
            $unwind: "$messages",
          },
          {
            $lookup: {
              from: "users",
              localField: "messages.messageInfo.senderId",
              foreignField: "_id",
              as: "messages.messageInfo.senderInfo",
            },
          },
          {
            $unwind: "$messages.messageInfo.senderInfo",
          },
          {
            $group: {
              _id: "$_id",
              groupTypeSetting: { $first: "$groupTypeSetting" },
              name: { $first: "$name" },
              profilePic: { $first: "$profilePic" },
              owner: { $first: "$owner" },
              userPermissionsAndExceptions: {
                $first: "$userPermissionsAndExceptions",
              },
              chatType: { $first: "$chatType" },
              notifications: { $first: "$notifications" },
              pinnedMessages: { $first: "$pinnedMessages" },
      
              messages: { $push: "$messages" },
            },
          },
          {
            $unwind: "$messages",
          },
          {
            $lookup: {
              from: "files",
              localField: "messages.messageInfo.senderInfo.profilePic",
              foreignField: "_id",
              as: "messages.messageInfo.senderInfo.profilePic",
            },
          },
          {
            $unwind: "$messages.messageInfo.senderInfo.profilePic",
          },
          {
            $group: {
              _id: "$_id",
              groupTypeSetting: { $first: "$groupTypeSetting" },
              name: { $first: "$name" },
              profilePic: { $first: "$profilePic" },
              owner: { $first: "$owner" },
              userPermissionsAndExceptions: {
                $first: "$userPermissionsAndExceptions",
              },
              members: { $first: "$members" },
              chatType: { $first: "$chatType" },
              notifications: { $first: "$notifications" },
              pinnedMessages: { $first: "$pinnedMessages" },
      
              messages: { $push: "$messages" },
            },
          }]

    }else{
        return []


    }


}