const fs = require('fs');
const csv = require('@fast-csv/parse');
const _ = require('lodash')

const read = async function () {
    return new Promise((resolve, rej) => {
        const data = []
        fs.createReadStream('./files/data.csv')
            .pipe(csv.parse())
            .on('error', error => console.error(error))
            .on('data', row => data.push({
                product_code: row[0],
                user_id: row[1],
                zone_code: row[2],
                score_skinbiosense: row[3],
                session_id: row[4],
                mesure: row[5]
            }))
            .on('end', rowCount => {
                data.shift()
                resolve(data)
            });
    })
}

function groupBy(data, field) {
    return _.chain(data)
    // Group the elements of Array based on `color` property
    .groupBy(field)
    // `key` is group's name (color), `value` is the array of objects
    .map((value, key) => ({ [field]: key, data: value }))
    .value()
}

function getMetric(code) {
    switch (code) {
        case '1':
            return 'STRESS'
        case '2':
            return 'HYDRA'
        case '3':
            return 'SKIN_BARRIER'
        default:
            break;
    }
}

module.exports = {
    read,
    groupBy,
    getMetric
}