let express = require('express')
let router = express.Router()
let LoraGateway = require('../models/gateway')

// create route
router.post('/gateway', (req, res) => {
	console.log(req.body)
	let gateway = {
		id: req.body.id,
		name: req.body.name,
		country_code: req.body.country_code,
		online: req.body.online,
		frequency_plan: req.body.frequency_plan,
		last_seen: req.body.last_seen,
		location: {
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			altitude: req.body.altitude
		}
	}
	LoraGateway.create(gateway, (err, gateway) => {
		if (err) {
            res.json({
                status: 500
            })
		}

		res.json({
            status: 200,
            gateway: gateway
        })
	})
})

router.get('/gateway', (req, res) => {

    console.log('test')

	LoraGateway.find({}, (err, gateways) => {

        if (err) {
            res.json({
                status: 500
            })
		}

		res.json({
            status: 200,
            gateways: gateways
        })
        
	})
})


// show route
router.get('/gateway/:id', (req, res) => {
	LoraGateway.findById(req.params.id, (err, foundGateway) => {
		if (err) {
            res.json({
                status: 500
            })
		}

		res.json({
            status: 200,
            gateway: foundGateway
        })
    })
})

// edit route
router.put('/gateway/:id', (req, res) => {
	LoraGateway.findByIdAndUpdate(req.params.id, req.body.gateway, (err, foundGateway) => {
		if (err) {
            res.json({
                status: 500
            })
		}

		res.json({
            status: 200
        })
	})
})

router.delete('/gateway/:id', (req, res) => {
	console.log('del route')
	LoraGateway.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
            res.json({
                status: 500
            })
		}

		res.json({
            status: 200
        })
	})
})

module.exports = router
