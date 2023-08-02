const indexFinder =  (x,y,list,value)=>{
    let borderIndex = Math.floor((x+y)/2)

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