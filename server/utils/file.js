import { promises } from "fs";
const deleteFile = async (file) => {
  await promises.unlink(file);
  console.log("Deleted");
};

export{
    deleteFile
}
