

export default{
    SUCCESS: "The operation has been successfull",
    SOMETHINGWENTWRONG : "Somthing went wrong",
    NOTFOUND: (entity: string)=>{
        return `${entity} not found`
    } 
}