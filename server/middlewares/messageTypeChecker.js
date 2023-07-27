const messageTypeChecker = async (req, res, next) => {
  const { body: message } = req;
  const contentType = message.content.contentType;
  let permissionType;
  if(contentType!="text"){
    permissionType = "sendMedia."+ contentType
  }else{
    permissionType = "sendMessage"
  }
  res.locals.permissionType = permissionType
  
  next();

};

export default messageTypeChecker 
