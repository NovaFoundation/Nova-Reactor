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
    var hash = getQueryString(hashParams);
    
    if (hash) {
        window.location.hash = hash;
    } else {
        history.pushState("", document.title, window.location.pathname);
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

var handler = undefined;