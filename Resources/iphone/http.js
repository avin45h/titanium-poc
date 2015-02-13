exports.request = function(_params) {
    Ti.API.trace("HTTP.request " + _params.url);
    if (Ti.Network.online) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.timeout = _params.timeout ? _params.timeout : 6e4;
        xhr.validatesSecureCertificate = false;
        xhr.onload = function(_data) {
            if (_data) {
                switch (_params.format.toLowerCase()) {
                  case "data":
                  case "xml":
                    _data = this.responseData;
                    break;

                  case "json":
                    _data = JSON.parse(this.responseText);
                    break;

                  case "text":
                    _data = this.responseText;
                }
                if (!_params.success) return _data;
                _params.passthrough ? _params.success(_data, _params.url, _params.passthrough) : _params.success(_data);
            }
        };
        _params.ondatastream && (xhr.ondatastream = function(_event) {
            _params.ondatastream && _params.ondatastream(_event.progress);
        });
        xhr.onerror = function(_event) {
            _params.failure ? _params.failure(this) : Ti.API.error(JSON.stringify(this));
            Ti.API.error(_event);
        };
        _params.type = _params.type ? _params.type : "GET";
        _params.async = _params.async ? _params.async : true;
        Ti.API.info("type is " + _params.type + " url is " + _params.url + " data is " + JSON.stringify(_params.data));
        xhr.open(_params.type, _params.url);
        if (_params.headers) for (var i = 0, j = _params.headers.length; j > i; i++) xhr.setRequestHeader(_params.headers[i].name, _params.headers[i].value);
        xhr.setRequestHeader("Accept-Encoding", "gzip");
        if (_params.data) {
            Ti.API.info("data is " + JSON.stringify(_params.data));
            xhr.send(_params.data);
        } else xhr.send();
    } else {
        Ti.API.error("No internet connection");
        var err = {
            type: "error",
            message: "No internet connection"
        };
        _params.failure ? _params.failure(err) : Ti.API.error(JSON.stringify(this));
    }
};