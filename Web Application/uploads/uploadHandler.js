const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, "./public/uploads/" + req.user.username);
    },
    filename: function(req, file, cb)
    {
        cb(null, req.body.phone);
    }
});

const upload = multer({ storage: storage});

module.exports = { upload};