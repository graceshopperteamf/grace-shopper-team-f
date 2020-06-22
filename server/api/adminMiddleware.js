const { User } = require('../db/models');

/*
    now we can protect our routes that require admin access
*/
const adminProtectMiddleWare = async (req, res, next) => {
    try {
        // if we're testing just assume it's ok
        if (process.env.NODE_ENV === 'test') {
            next();
            return;
        }

        const throwNotAdminError = () => {
            const e = new Error('Access Denied, You Are Not An Admin!');
            e.status = 401;
            throw e;
        };

        if (!req.user)
            throwNotAdminError();

        // check the admin flag on the actual user row in the table (if it exists)
        // just to make sure there's no trickery done with the isAdmin flag from the frontend....
        const user = await User.findByPk(req.user.id);
        if (!user || !user.isAdmin)
            throwNotAdminError();

        // if the user is an admin, just go to the next middleware handler
        next();
    }
    catch (e) {
        next(e);
    }
};

module.exports = adminProtectMiddleWare;
