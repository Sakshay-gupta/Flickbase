const { ApiError } = require('../middleware/apierror')
const httpStatus = require('http-status')
const { userService, authService, emailService } = require('../services/index')

const userController = {
    async findUser(req, res, next){
        try{
            const user = await userService.findUserById(req.user._id);
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND, "Sorry no user found")
            }
            res.json(res.locals.permission.filter(user._doc))
        } catch(error) {
            next(error);
        }
    },
    async updateProfile(req, res, next){
        try{
            const user = await userService.updateUserProfile(req);
            res.json(res.locals.permission.filter(user._doc))
        } catch(error){
            next(error);
        }
    },
    async updateUserEmail(req, res, next){
        try{
            const user = await userService.updateUserEmail(req);
            const token = authService.generateToken(user);
            await emailService.registerEmail(user.email,user);
            res.cookie('x-access-token', token)
            .send({
                user: res.locals.permission.filter(user._doc),
                token:token
            })
        } catch(error){
            next(error)
        }
    },
    async verifyAccout(req,res,next){
        try{
            const token = userService.validateToken(req.query.validation);
            const user = await userService.findUserById(token.sub);

            if(!user) throw new ApiError(httpStatus.NOT_FOUND,'User not found');
            if(user.verified) throw new ApiError(httpStatus.NOT_FOUND,'Already verified');

            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                email: user.email,
                verified:true
            })
        } catch(error){
            next(error)
        }
    }
}
module.exports = userController;