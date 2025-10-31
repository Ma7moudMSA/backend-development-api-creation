const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//mongoose.set('useFindAndModify', false);
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
           // useNewUrlParser: true, // eliminates the connection string parser deprecation warning
            // You may also want to add:
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit with failure
    }
};

// Call the connectDB function immediately
connectDB();

module.exports = connectDB;