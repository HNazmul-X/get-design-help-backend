const nodemailer = require("nodemailer");

module.exports = class MyEmailServer {
    /**
     * @type {}
     * @param {to, body, subject, from, text, serverConfig, host, port, secure, username, password} properties
     */
    constructor({ to, html, subject, from, text, host, port, secure, username, password }) {
        this.to = to;
        this.html = html;
        this.subject = subject;
        this.text = text;
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.username = username;
        this.password = password;
        this.from = from;
    }

    server() {
        return nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: {
                user: this.username,
                pass: this.password,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    sendEmail() {
        return new Promise((resolve, reject) => {
            const emailConfig = {
                to: this.to,
                subject: this.subject,
                html: this.html,
                text: this.text,
                from: this.from,
            };
            this.server().sendMail(emailConfig, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }

    /**
     *
     * @param {Object({to, html, text, subject})} mailOptions
     * @returns {Promise}
     */
    static emailSentWithNazmul_Sarlex_org(mailOptions) {
        return new Promise((resolve, reject) => {
            const { to, html, text, subject } = mailOptions;

            const server = new MyEmailServer({
                to: to || "Nazmul.w3@gmail.com",
                host: "sarlex.org",
                secure: true,
                username: "nazmul@sarlex.org",
                password: "$tDZBnP!kIc9c9LdGm",
                port: 465,
                to: to || "nazmul.w3@gmail.com",
                html,
                text,
                subject,
                from: '"Get Design Help" <nazmul@sarlex.org>',
            });
            console.log("entering")
            server
                .sendEmail()
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
};
