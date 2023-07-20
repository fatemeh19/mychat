import * as Services from "../services/index.js";

const addMember = async (req, res) => {
    // if new member has privacy limitations send suitable error
    // limitations for number of members
  const {
    body: { memberId },
    params: { groupId },
  } = req;
  const addToGroupResult = await Services.Chat.findAndUpdateChat(groupId, {
    $push: { memberIds: memberId },
  });
  console.log(addToGroupResult)
  res.send("ok")
};

export { addMember };
