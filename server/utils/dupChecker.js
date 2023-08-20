import * as uniques from "./uniques.js";
import * as Services from "../services/dbServices.js";
export default async (model, update) => {
    let index = 0
  for (const element of uniques[model]) {
    
    if (update[element]) {
      const dup = await Services.findOne(model, { [element]: update[element] });
      if (dup) {
        
        return {dup, element};
      }
      
      
    }
    if (index + 1 == uniques[model].length) {
        let dup ,element =0
      return {dup, element};
    }
    index++
  }
  
 
};
