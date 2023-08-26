import { promises, rmSync } from "fs";
const deleteFile = async (path) => {
  if (await exists(path)) {
    await promises.unlink(path);
    console.log("Deleted");
  }
};

const exists = async (path) => {
  try {
    await promises.access(path);
    return true;
  } catch {
    return false;
  }
};

const rename = async (newPath,oldPath)=>{
  const result = await promises.rename(oldPath,newPath)
  return result
}
const mkdir = async (path)=>{
  await promises.mkdir(path, { recursive: true })
}

export { deleteFile, rename,mkdir,exists };
