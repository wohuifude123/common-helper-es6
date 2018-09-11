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
    },

    async sendToServer ( url, method, headers, postBody ) {
        const _self = this;
        var response = [];
        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: postBody,
                mode: 'cors',
                credentials: 'include'
            })
            return response.json();

        } catch (e) {
            console.log("Oops, error", e)
        }
    },

    postFromServer ( requestParam ) {
        const _self = this;
        let url = requestParam['url'] || '';
        let headers = requestParam['headers'] || '';
        let postBody = requestParam['postBody'] || '';
        let response = _self.sendToServer( url, 'POST', headers, postBody );

        return response.then(function(value) {
            //console.log('第三方 value === ', value)
            if( value['code'] === 200 ) {
                return value
            }
        }, function(error) {
            console.log('第三方 error === ', error)
        });
    }
}
