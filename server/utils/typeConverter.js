import mongoose from "mongoose"

const objectId =async (value)=>{

    if(value instanceof Object){
        value = value.map(function (element) {
            return new mongoose.Types.ObjectId(element);
          });

    }else{
        value = new mongoose.Types.ObjectId(value)
    }
    return value


}

export { objectId}