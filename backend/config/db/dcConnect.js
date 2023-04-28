const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL ,
        {
            useUnifiedTopology : true,
            // useCreateIndex : true,   
            // useFindAndModify : false,
            useNewUrlParser : true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error ${error.message}`)
    }
}

module.exports = dbConnect;