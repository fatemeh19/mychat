import { promises } from "fs";
import path from "path";
const deleteFile = async (file) => {
  await promises.unlink(file);
  console.log("Deleted");
};

export{
    deleteFile
}
