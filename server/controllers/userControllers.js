const User = require("../model/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const {name, username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck) return res.json({msg: "Username already exists", status: false});
        const emailCheck = await User.findOne({email});
        if(emailCheck) return res.json({msg: "Email already exists", status: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username, 
            email,  
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch(error){
        next(error);
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            const username = email;
            user = await User.findOne({username});
            if(!user) return res.json({msg: "Invalid Credintials!", status: false});
        }
        const pwCheck = await bcrypt.compare(password, user.password);
        if(!pwCheck) return res.json({msg: "Invalid Credintials!", status: false});
        delete user.password;
        return res.json({status: true, user});
    } catch(error){
        next(error);
    }
};

module.exports.avatar = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const avatar = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarSet: true,
            avatar,
        });
        return res.json({
            isSet: userData.isAvatarSet,
            image: userData.avatar,
        })
    }catch(ex){
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id} }).select([
            "email",
            "name",
            "username",
            "avatar",
            "_id",
        ]);
        return res.json(users);
    } catch(ex){
        next(ex);
    }
};