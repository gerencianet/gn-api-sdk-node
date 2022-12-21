const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let planBody = {
	name: 'My first plan',
	repeats: 24,
	interval: 2,
}

let subscriptionBody = {
	items: [
		{
			name: 'Product 1',
			value: 1000,
			amount: 2,
		},
	],
}

const gerencianet = new Gerencianet(options)

function createSubscription(response) {
	let params = {
		id: response.data.plan_id,
	}

	return gerencianet.createSubscription(params, subscriptionBody)
}

gerencianet.createPlan({}, planBody)
	.then(createSubscription)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
