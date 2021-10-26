const mongoose = require("mongoose");

const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI, {}).then((data) => {
        console.log(`mongodb is connected with server: ${data.connection.host}`);
    })

    // removed the catch code as we have written the unhandled promise rejection in the server.js file which will enact as the catch block
}

module.exports = connectDatabase