const mongoose = require('mongoose');

module.exports = function(mongoURL) {
    mongoose.connect(mongoURL);
    const regNumbers = mongoose.Schema({
        name: String
    })
    // regNumbers.index({
    //     name: 1
    // }, {
    //     unique: true
    // })
    const regModel = mongoose.model("regModel", regNumbers)

    return {
        regModel
    }
    // This saves the data to the database
    Users.save(function(err, results) {
        if (error) {
            console.error(error);
        } else {
            return results;
        }
    });
}
