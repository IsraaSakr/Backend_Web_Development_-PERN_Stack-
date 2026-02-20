import jwt from "jsonwebtoken";

// auth middleware: runs before protected routes to verify the user has a valid token
function auth(req, res, next) {
    // grab the token from the request header (sent by the frontend)
    const token = req.headers.token;

    // if no token was sent, reject the request
    if (!token)
        return res.status(401).json({msg: "you are not authenticated"});
    
    try {
        // jwt.verify does two things:
        // 1. checks the token hasn't been tampered using the secret key
        // 2. decodes it and returns the payload we originally signed (userid, userrole)
        const decoded = jwt.verify(token, "edgvhgvbujjugvftgdxsesxxftyghb");

        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({msg: "invalid token"});
    }
}

// isAdmin middleware: runs after auth to check if the user has admin privileges
// req.user is already set by auth middleware above
function isAdmin(req, res, next) {
    if (req.user.userrole !== 1)
        return res.status(403).json({msg: "only admin"});
    next(); // user is admin, allow the request to proceed
}

export {auth, isAdmin}
