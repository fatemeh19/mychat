import { promises } from "fs";
const deleteFile = async (path) => {
  if(await exists(path)){
    await promises.unlink(path);
    console.log("Deleted");
  }
 
};

 const exists = async (path) =>{  
  try {
    await promises.access(path)
    return true
  } catch {
    return false
  }
}

export{
    deleteFile
}
