const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'frontogenesis@gmail.com',
        subject: 'Welcome To Wet Microburst',
        text: `Welcome to Wet Microburst, ${name}! Enjoy your experience.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'frontogenesis@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Hello ${name}. Your account information has been deleted.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}