export const checkRole = (roleName) => {
    return (request, response, next) => {
        try{
            if(request.userInfo && request.userInfo.role && request.userInfo.role == roleName){
                next();
            }
            else{
                return response.status(403).json({message: 'Unauthorized User'});
            }
        }catch(err){
            console.log('Role MiddleWare failed');
            return response.status(500).json({message: 'Something went Wrong...'});
        }
}
}