const jwt = require('jsonwebtoken');
const { sessionName, secret } = require('../constants');

// const { promisify } = require('util');
// const jwtVerify = promisify(jwt.verify);


exports.auth = async (req, res, next) => {
    const token = req.cookies[sessionName];

    if (token) {
        jwt.verify(token, secret, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(sessionName);

                // return next(err);
                res.redirect('/auth/login')
            }

            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();

        }));
    } else {
        next();

    }

};

// exports.auth = async (req, res, next) => {
//     // прочитаме от кукито сесията
//     let token = req.cookies[sessionName];

//     if (token) {
//         try {
//             let decodedToken = await jwtVerify(token, secret);

//             // закрепваме декодираната информация на валидния токен и я закрепваме за рекусета
//             //  следващите miidleware и actions, ще имат достъп до тази информация, заради req.user

//             req.user = decodedToken;
//             res.locals.user = decodedToken;

//         } catch (err) {
//             res.clearCookie(sessionName);

//             console.log(err);
//             res.redirect('/auth/login')
//             next();
//         }
//     }

//     next();
// };


exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    next();

}
exports.isGuest = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
    }
    next();

}