const indexFinder =  (x,y,list,value,reverse=false)=>{
    let borderIndex = Math.floor((x+y)/2)
    // console.log(x, y , list , value)
    console.log("list=",list)
    console.log("value=",value)
    console.log("list[border]=",list[borderIndex])
    if(list[borderIndex].equals(value)){
        return borderIndex
    }else{
       if(list[borderIndex]>value){
        return  indexFinder(0,borderIndex-1,list,value)
       }else{
        return  indexFinder(borderIndex+1,y,list,value)
       }
    }
}
export default indexFinder