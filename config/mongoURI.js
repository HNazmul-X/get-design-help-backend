require("dotenv").config()

exports.mongoURI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.h5y9b.mongodb.net/GetDesignHelp?retryWrites=true&w=majority`;