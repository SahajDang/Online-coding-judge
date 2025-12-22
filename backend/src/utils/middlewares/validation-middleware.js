export const validation = (schema)=>{
    return  async (request, response, next)=>{
    try{    
    request.body = await schema.parseAsync(request.body);
    next();
    }
    catch(err){
        return response.status(400).json({message:'User Validation', errors: err});
        //next(err);
    }
}
}