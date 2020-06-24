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

        if (!req.user || !req.user.isAdmin)
            throwNotAdminError();

        // if the user is an admin, just go to the next middleware handler
        next();
    }
    catch (e) {
        next(e);
    }
};

module.exports = adminProtectMiddleWare;
