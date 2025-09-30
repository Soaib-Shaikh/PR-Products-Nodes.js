const { default: mongoose } = require("mongoose");

const subCatSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: String
});

const SubCategory = mongoose.model('subCategory', subCatSchema);

module.exports = SubCategory;