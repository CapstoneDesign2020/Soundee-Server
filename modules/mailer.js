const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    serveice :'Gmail',
    auth : {
        user : "mchnlearn97@gmail.com",
        pass : "IntroductionToML"
    },
    tis :{
        rejectUnauthorized: false
    }
})

