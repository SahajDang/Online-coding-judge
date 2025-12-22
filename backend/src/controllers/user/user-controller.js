import { generateToken } from "../../services/token.js";
import { addUser, finduserByEmail } from "../../services/user-service.js";
import { comparePwd } from "../../utils/services/encryption.js";

export const doRegister = async (request, response) => {
    const userInfo = request.body;
    try {
        const userDoc = await addUser(userInfo);

        if (userDoc && userDoc._id) {
            const token = generateToken({
                email: userDoc.email,
                role: userDoc.role
            });
            const userData = {
                name: userDoc.name,
                email: userDoc.email,
                role: userDoc.role,
                rating: userDoc.rating,
                solvedCount: userDoc.solvedCount
            };
            return response
                .status(200)
                .json({
                    message: "User Registered Successfully",
                    user: userData,
                    token
                });
        }
        return response
            .status(500)
            .json({ message: "User Addition failed...." });

    } catch (err) {
        console.log("Register Error", err);
        return response.status(500).json({ message: "User Addition Failed" });
    }
};

export const doLogin = async (request, response) => {
    try{
    const {email, password} = request.body;
    console.log('Email is: ', email);
    console.log('Password is: ', password);
    const user = await finduserByEmail(email);
    if(!user){
        return response.status(401).json({message: 'Invalid email or password'});
    }
    const isMatched = await comparePwd(user.password, password);
    if(!isMatched){
        return response.status(401).json({message: 'Invalid email or password'});
    }

    //User has been verified, then do generate token

    const token = generateToken({email: user.email, role: user.role});
    const userInfo = {
        name : user.name,
        email : user.email,
        role: user.role,
        rating: user.rating,
        solvedCount : user.solvedCount
    }

    response.status(200).json({message: 'Login Successfully' , user: userInfo, token});
    } 
    catch(err){
        console.log('Login Error');
        return response.status(500).json({message: 'Something went wrong'});
    }
}