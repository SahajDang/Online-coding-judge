import bcrypt from 'bcrypt';

export const encrypt = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
}

export const comparePwd = (encryptedPwd, plainPwd) => {
    return bcrypt.compare(plainPwd, encryptedPwd);
}