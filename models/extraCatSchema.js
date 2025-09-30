const { default: mongoose } = require("mongoose");


const extCatSchema = new mongoose.Schema ({
    name:String,
    image: String
})

const ExtraCategory = mongoose.model('extraCategory', extCatSchema);

module.exports = ExtraCategory;