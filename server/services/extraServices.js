import Chat from '../models/Chat.js';
import * as fileController from '../utils/file.js'
import { findMany } from './dbServices.js';
const deleteFileMessages = async (Query) => {
  const messages = await findMany('message',Query);

  messages.forEach((message) => {
    if (message.content.contentType != "text") {
      fileController.deleteFile(message.content.url);
    }
  });
};
const chatTypeGetter = async (chatId)=>{
  const chatType = await Chat.findById(id, { chatType: 1 });


}

export {
  deleteFileMessages
}
