const { Test } = require('./test-model');
const _ = require('lodash');
const { groupBy, getMetric } = require('./helpers');

async function getCharts() {
    const res = await _getTests()
    const data = []
    for (const i of groupBy(res, 'product')) {
        for (const j of groupBy(i.data, 'zone_code')) {
            for (const k of groupBy(j.data, 'score_skinbiosense')) {
                data.push({
                    product: i.product,
                    zone_code: j.zone_code === 'true' ? 'TREATED' : 'UNTREATED',
                    metric: getMetric(k.score_skinbiosense),
                    values: _.sortBy(k.data, 'session_id').map(v => v.average),
                    labels: _.sortBy(k.data, 'session_id').map(v => v.session_id)
                })
            }
        }
    }
    return groupBy(data, 'product')
}

module.exports = {
    getCharts
}

const _getTests = () => {
    return Test.aggregate([
        {
            $group: {
                _id: {
                    score_skinbiosense: '$score_skinbiosense',
                    session_id: '$session_id',
                    product_code: '$product_code',
                    zone_code: '$zone_code'
                },
                average: { $avg: '$mesure' }
            }
        },
        {
            $project: {
                _id: 0,
                average: 1,
                product: '$_id.product_code',
                zone_code: '$_id.zone_code',
                score_skinbiosense: '$_id.score_skinbiosense',
                session_id: '$_id.session_id',
            }
        },
    ])
}