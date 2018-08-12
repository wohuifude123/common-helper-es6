module.exports = {
	fetchData( dataUrl, start ) {
		return new Promise((resolve, reject) => {
			fetch(`${dataUrl}/data${(start+ 0 + '').padStart(2, '0')}.json`)
				.then((data) => {
					resolve(data.json());
				}, (error) => {
					reject(error);
				})
		});

	},

	async getData( dataUrl, start ) {

		const _self = this;
		let data = await _self.fetchData( dataUrl, start );
		return data;

	},
	receiveData( dataUrl, start ) {
		const _self = this;
		let data = {};

		_self.getData('virtual/result', 2).then(
			function(responseThenData) {
				data = responseThenData;
			})
			.then(function() {
				//console.log('abc')
			})
			.catch(function(e) {
				console.log("promise, error =", e);
			});

		return data;
	}
}

