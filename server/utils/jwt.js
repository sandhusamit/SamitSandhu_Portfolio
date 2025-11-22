import jwt from 'jsonwebtoken';
import { addToken } from '../controllers/tokenController.js';

const generateToken = (user) => {
    const tokenString = jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }, 
        process.env.JWT_SECRET,
        { 
            expiresIn: '1h' 
        }
    )
    // Save token to DB
    addToken({
        userId: user._id,
        tokenString,
        status: 'active',
        createdOn: new Date(),
        expiresOn: new Date(Date.now() + 60 * 60 * 1000) // 1 hour later
    });
    return tokenString;
    
} 



export default generateToken;
