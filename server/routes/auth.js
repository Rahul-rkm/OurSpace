const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// Register
router.post('/register', async (req, res) => {
    try {
        // generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // create a new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        // save the user to database
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json({ "type": "LOGIN_ERR_NOUSER", "message": "User not found" });
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            // const { password, ...userData } = user._doc;
            const { ...userData } = user._doc;
            validPassword && res.status(200).json(userData);
            !validPassword && res.status(400).json({ "type": "LOGIN_ERR_WPASS", "message": "Wrong password" });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;