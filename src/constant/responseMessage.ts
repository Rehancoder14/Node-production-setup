

export default{
    SUCCESS: "Success",
    SOMETHINGWENTWRONG : "Somthing went wrong",
    NOTFOUND: (entity: string)=>{
        return `${entity} not found`
    } ,
    TOO_MANY_REQUEST : 'Too many request! Please try again after sometime',
    INVALID_REQUEST: 'Invalid request',
    ALREADYEXISTS: (entity:string)=>{
        return  entity;
    }
}