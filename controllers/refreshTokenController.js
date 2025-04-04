const { User } = require('../models/index.js');
const jwt = require("jsonwebtoken");


const RefreshToken = async(req, res, next) => {
    try {
        // 1. get refresh token from cookies
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.send({message: 'Unauthorized! Please login first!!!'});
        
        // 2. Matching dengan refresh token yg ada di DB
        const user = await User.findOne({
            where:{
                refreshToken: refreshToken
            }
        })

        if(!user) return res.sendStatus(403)

        // 3. Verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (error, decoded) => {
            if (error) return res.sendStatus(403);

            // 4. Declare data user
            const accessToken = jwt.sign({ id: user.id, fullname: user.fullname, email: user.email }, process.env.SECRET_TOKEN_KEY,{
                expiresIn: '20s'
            })
            res.json({accessToken});
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500); 
    }
}

module.exports = RefreshToken;