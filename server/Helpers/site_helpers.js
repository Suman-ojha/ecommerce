const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    generateToken : async function(payload , expires= '1d'){
        //here we encrypt the jwt base64 encoded token
        const options = {expiresIn : expires}
        const tokenData = payload;
        const token = jwt.sign(tokenData , process.env.JWTSECRET , options);
        const encodedToken = Buffer.from(token).toString('base64')
        return encodedToken;
    },

    decryptToken : async function(token ){
        try {
            //here we decrypt the jwt base64 encoded token
            const decodedToken = Buffer.from(token).toString('utf-8');
            const jwt_token_data = jwt.verify(decodedToken);
            return jwt_token_data;
        } catch (error) {
            return { status: 'false', message: e.message || 'Failed to authenticate token.' };
        }
    }
}