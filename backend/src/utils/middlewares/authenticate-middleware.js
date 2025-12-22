import { verifyToken } from "../../services/token.js";

export const authenticate = (request, response, next) => {
    try{
    const headerValue = request.headers.authorization || request.headers.Authorization;
    console.log('Header Value is: ', headerValue);
    const decodedValue = verifyToken(headerValue);
    if(!decodedValue){
        return response.status(401).json({message: 'Unauthorized Access'});
    }
    request.userInfo = decodedValue;
    next();
    }catch(err){
        console.error('Auth middleWare failed');
        return response.status(500).json({message: 'Sonething went wrong...'});
    }
}