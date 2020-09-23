
export function isMatch(str : string, pattern : string) : boolean{
    return str.match(pattern) != null;
}

export function isNotMatch(str : string, pattern : string) : boolean{
    return str.match(pattern) == null;
}

export function isFullMatchInUpperCase(str : string, pattern : string) : boolean{
    return str.toUpperCase().match(pattern) != null;
}

export function isNotFullMatchInUpperCase(str : string, pattern : string) : boolean{
    return str.toUpperCase().match(pattern) == null;
}