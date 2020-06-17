

const adminProtectMiddleWare = async (req, res, next) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            const e = new Error('Access Denied, You Are Not An Admin!');
            e.status = 401;
            throw e;
        }
        next();
    }
    catch (e) {
        next(e);
    }
};

module.exports = adminProtectMiddleWare;
