
export function isFullMatch(str : string, pattern : string){
    return str.match(pattern);
}

export function isNotMatch(str : string, pattern : string){
    return !str.match(pattern);
}

export function isFullMatchInUpperCase(str : string, pattern : string){
    return str.toUpperCase().match(pattern);
}

export function isNotFullMatchInUpperCase(str : string, pattern : string){
    return !str.toUpperCase().match(pattern);
}