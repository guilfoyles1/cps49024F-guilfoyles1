const mongoose = require('mongoose');

const CandySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        maxlength: 50
    },
    brand: {
        type: String,
        required: true,
        maxlength: 50
    },
    quantity: {
        type: Number,
        required: true,
    },
});

CandySchema.statics.findByBrand = async function(query) {
    return await this.findOne({brand: query});
};

CandySchema.statics.getAll = async function() {
    return await this.find({});
};

CandySchema.methods.otherBrands = async function() {
    return await this.find({company: this.company,});
};

const CandyModel = mongoose.model('Candy', CandySchema);

module.exports = CandyModel