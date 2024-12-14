const express = require("express");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async (req, res, next) => {
    try {
        let { username, password } = req.body;
        // return boolean if user authenticated
        const authenticated = await User.authenticate(username, password);
        // create jwt if user authenticated
        if (authenticated) {
            let token = jwt.sign({ username }, SECRET_KEY)
            User.updateLoginTimestamp(username);
            return res.json({ token })
        } else {
            throw new ExpressError("Invalid Username or Password", 400)
        }
    } catch (error) {
        return next(error)
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
*
*  Make sure to update their last-login!
*/

router.post("/register", async (req, res, next) => {
    try {
        // extract username 
        let { username } = await User.register(req.body);
        // create new token with username as token 
        let token = jwt.sign({ username }, SECRET_KEY);
        // update time stamp on the user
        User.updateLoginTimestamp(username);
        return res.json({ token })
    } catch (error) {
        return next(error)
    }
})

module.exports = router;