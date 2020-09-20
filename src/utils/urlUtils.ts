
export function buildUrl(basicUrl : string, params : any) : string {
    let paramsUrl : string = '';
    for(let key in params){
        if (paramsUrl.length !== 0){
            paramsUrl += "&"
        }
        let value = params[key];
        if (!value) {
            continue;
        }
        if (typeof value === 'object'){
            value = encodeURIComponent(JSON.stringify(value))
        }
        paramsUrl += key + "=" + value;
    }

    return basicUrl + "?" + paramsUrl;
}

export function encodePayload(basicUrl : string, params : any) : string {
    let paramsUrl : string = '';
    for(let key in params){
        if (paramsUrl.length !== 0){
            paramsUrl += "&"
        }
        let value = params[key];
        if (!value) {
            continue;
        }
        if (typeof value === 'object'){
            value = encodeURIComponent(JSON.stringify(value))
        }
        paramsUrl += key + "=" + value;
    }

    return basicUrl + "?" + paramsUrl;
}