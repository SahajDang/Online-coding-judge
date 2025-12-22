import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = "7d") => {
    const secret = process.env.JWT_SECRET || "ucantseemytoken";
    return jwt.sign(payload, secret, {expiresIn});
}

export const verifyToken = (token) => {
    try{
        const secret = process.env.JWT_SECRET || "ucantseemytoken";
        return jwt.verify(token, secret);
    }catch(err){
        console.log('Verification of Token failed', err);
        return null;
    }
}

export const decodeToken = (token) => {
    try{
        return jwt.decode(token);
    }catch(err){
        return null;
    }
}