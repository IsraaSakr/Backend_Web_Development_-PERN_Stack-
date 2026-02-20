function testMiddleware(req, res, next) {
        const id = req.params.id;
    if(isNaN(id)){
        return res.status(400).json({message: "id must be a number"});
    }
    console.log("This is a test middleware");
    next();
}

export default testMiddleware;
