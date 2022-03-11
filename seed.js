require('./db');
const { read } = require('./helpers');
const { Test } = require('./test-model');

(async () => {
    let result = await read()
    result = result.map((value) => ({
        product_code: value.product_code,
        user_id: value.user_id,
        zone_code: value.zone_code === '1' ? false : true,
        score_skinbiosense: value.score_skinbiosense,
        session_id: value.session_id,
        mesure: parseFloat(value.mesure.replace(/\,/g, ".")),
    }))
    await Test.insertMany(result)
})()
