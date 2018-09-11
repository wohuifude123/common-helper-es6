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
        let code = requestParam['code'] || 200;
        let consoleMessage = requestParam['consoleMessage'] || false;
        let response = _self.sendToServer( url, 'POST', headers, postBody );

        return response.then(function(value) {
            if ( consoleMessage === true ) {
                console.log('common-helper-es6 postFromServer === ', value)
            }
            return value;
        }, function(error) {
            console.log('postFromServer error === ', error)
        });
    },
    /**
     * set LocalStorage
     * @param
     */
    setLocalStorage(key,value){
        var curTime = new Date().getTime();
        var localStorageJSON = {
            data:value,
            time:curTime
        }
        localStorage.setItem(key,JSON.stringify(localStorageJSON));
    },
    /**
     * get LocalStorage
     * @param
     */
    getLocalStorage(key,exp){
        var data = localStorage.getItem(key);
        var dataObj = JSON.parse(data);
        if (new Date().getTime() - dataObj.time>exp) {
            console.log('信息已过期');
            //alert("信息已过期")
        }else{
            //console.log("data="+dataObj.data);
            //console.log(JSON.parse(dataObj.data));

            console.log("data="+JSON.stringify(dataObj));

            var dataObjDataToJson = dataObj.data
            return dataObjDataToJson;
        }
    }
}
