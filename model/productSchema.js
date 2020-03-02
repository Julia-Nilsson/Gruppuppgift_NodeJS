const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
    lakrits: { type: Boolean },
    chokladlakrits: { type: Boolean },
    name: { type: String, minlength: 3, required: true },
    price: { type: Number, required: true },
    img: { data: Buffer, contentType: String },
    description: { type: String, required: true },
    createdByAdmin: { type: String, required: true },
    date: { type: Date, default: Date.now }
});


const newCandy = mongoose.model("List of candy", schemaProduct);

module.exports = newCandy;