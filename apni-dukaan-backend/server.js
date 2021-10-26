const app = require('./app')
const dotenv = require('dotenv');
const connectDatabase = require('./db/database')

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1)
})

// config path
dotenv.config({path:"apni-dukaan-backend/config/config.env"})

// Database path
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is live on http://localhost:${process.env.PORT}`);
})

// unhandled Promise Rejections

// we are doing this so that if any kind of server problems appear which we cant handled but it is not crashing the server it is throwing an error and thus to avoid this we will forcefully crash the server so as to avoid the beizatti

process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})
