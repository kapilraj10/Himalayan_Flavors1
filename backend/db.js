const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI = 'mongodb+srv://kapilraj10:Mount%402057@cluster0.2cftc.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0'


module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
        if (err) {
            console.log("---" + err);
            return;
        }

        console.log("connected to mongo");

        try {
            // Define Mongoose models for the collections
            const Food = mongoose.model('Food', new mongoose.Schema({}, { strict: false }), 'food_items');
            const Category = mongoose.model('Category', new mongoose.Schema({}, { strict: false }), 'Categories');

            // Fetch data using Mongoose models
            const data = await Food.find({});
            const Catdata = await Category.find({});

            // Pass data to callback
            callback(err, data, Catdata);
        } catch (error) {
            console.log("Error fetching collections: ", error);
            callback(error);
        }
    });
};
