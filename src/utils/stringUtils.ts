
export function isMatch(str : string, pattern : string) : boolean{
    return str.match(pattern) != null;
}

export function isNotMatch(str : string, pattern : string) : boolean{
    return str.match(pattern) == null;
}

export function isMatchInUpperCase(str : string, pattern : string) : boolean{
    return str.toUpperCase().match(pattern) != null;
}

export function isNotMatchInUpperCase(str : string, pattern : string) : boolean{
    return str.toUpperCase().match(pattern) == null;
}

export function fillString(str : string, ...params: string[]) : string {
    params.forEach(((value, index) => {
        str = str.replace(`{${index}}`, value);
    }))
    return str;
}