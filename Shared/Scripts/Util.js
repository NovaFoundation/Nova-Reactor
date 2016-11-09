function getHashParams() {
    var hashParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.hash.substring(1);

    while (e = r.exec(q))
       hashParams[d(e[1])] = d(e[2]);

    return hashParams;
}

function getQueryString(params) {
    var url = "";
    
    var index = 0;
    
    Object.keys(params).forEach(function (key) {
        var value = params[key];
        
        if (value) {
            if (index++ > 0) {
                url += "&";
            }
            
            url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    });
    
    return url;
}

var hashParams = getHashParams();

function updateHash() {
    window.location.hash = getQueryString(hashParams);
}