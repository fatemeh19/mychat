import * as Services from "../services/dbServices.js";
import { addMember,editGroupInfo,editGroupPermissions,editGroupType,removeMember } from "../controllers/groupController.js";  

export default function (io) {

  const add_member = async function (groupId, memberId) {
    const socket = this;
    const member = await addMember(groupId,memberId)
    io.to(groupId).emit("addMember", member);
  };
  const edit_groupType = async function (groupId, data) {
    const socket = this;
    const editedGroupType = await editGroupType(groupId,data)
    io.to(groupId).emit("editGroupType", editedGroupType);
  };

  const remove_member = async function (groupId, memberId) {
    const socket = this;
    const member = await removeMember(groupId,memberId)
    io.to(groupId).emit("removeMember", member);
  };

  const edit_groupPermissions = async function (groupId,body) {
    const socket = this;
    const editedGroupPermissions = await editGroupPermissions(groupId,body)
    io.to(groupId).emit("editGroupPermissions", editedGroupPermissions);
  };

  const edit_groupInfo = async function (groupId,body) {
    const socket = this;
    const editedGroupInfo = await editGroupInfo(groupId,body)
    io.to(groupId).emit("editGroupInfo", editedGroupInfo);
  };


  
  return { add_member,remove_member,edit_groupInfo,edit_groupPermissions,edit_groupType };
}
