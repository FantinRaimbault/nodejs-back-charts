const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    product_code: { type: String }, // produit
    user_id: { type: String },
    zone_code: { type: Boolean },
    score_skinbiosense: { type: String }, // stress ox, barriere, hydra
    session_id: { type: String }, // T1, T2, T3 temparolity
    mesure: { type: Number }, // value
})

const Test = mongoose.model('Test', testSchema)

module.exports = { Test }
