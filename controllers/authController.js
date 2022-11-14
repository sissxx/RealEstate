const router = require('express').Router();

const authService = require('../services/authServices');
const { sessionName } = require('../constants');
const { isAuth, isGuest } = require('../middleware/authMiddleware');

const { getErrorMsg } = require('../util/errorMsg');


router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');

});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;
    
    const user = await authService.login(username, password);
    const token = await authService.createToken(user);

    res.cookie(sessionName, token, { httpOnly: true });
    res.redirect('/');

});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');

});

router.post('/register', isGuest, async (req, res) => {
    const { password, repeatPassword, ...userData } = req.body;
    // console.log(req.body);

    if (password !== repeatPassword) {
        return res.render('auth/register', { error: 'Password must be equal' });
    };

    try {
        // Create user
        const createdUser = await authService.create({ password, ...userData });
        // await authService.create({ username,password, address});
        const token = await authService.createToken(createdUser);
        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        //Add mongoose error mapper
        return res.render('auth/register', { error: getErrorMsg(error) });

    }


});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(sessionName);
    res.redirect('/');

})


module.exports = router;