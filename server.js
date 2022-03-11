require('./db');
const cors = require('cors')
const express = require('express');
const { getCharts } = require('./repo');
const server = express()

server.use(cors())

server.get('/charts', async function (req, res) {
    try {
        const data = await getCharts()
        res.json({
            data
        })
    } catch(e) {
        console.log(e)
    }
})

server.listen(3000, () => console.log('api connected'));