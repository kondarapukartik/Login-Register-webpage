// jwt-controller.js
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
import Token from '../model/token.js';

// @desc    Generate JSON Web Tokens for user authentication

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return response.status(401).json({ msg: 'Token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'Invalid token' });
        }

        request.user = user;
        next();
    });
};

export const createNewToken = async (request, response) => {
    const refreshToken = request.body.token;

    if (!refreshToken) {
        return response.status(401).json({ msg: 'Refresh token is missing' });
    }

    const tokenParts = refreshToken.split(' ');

    if (tokenParts.length !== 2) {
        return response.status(401).json({ msg: 'Invalid refresh token format' });
    }

    const token = await Token.findOne({ token: tokenParts[1] });

    if (!token) {
        return response.status(404).json({ msg: 'Refresh token is not valid' });
    }

    jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(500).json({ msg: 'Invalid refresh token' });
        }



        
        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });

        return response.status(200).json({ accessToken });
    });
};