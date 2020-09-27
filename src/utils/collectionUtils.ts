import Domain from "../abstract/domain";

export function isInDomainsCollection<T extends Domain>(object : T, collection : T[]) : boolean {
    for (let o of collection){
        if (o.equals(object)){
            return true;
        }
    }
    return false;
}

export function isNotInDomainsCollection<T extends Domain>(object : T, collection : T[]) : boolean {
    return !isInDomainsCollection(object, collection);
}

export function isIn<T>(object : T, collection : T[]) : boolean {
    for (let o of collection){
        if (o === object){
            return true;
        }
    }
    return false;
}

export function isNotIn<T extends Domain>(object : T, collection : T[]) : boolean {
    return !isIn(object, collection);
}

export function getRandomElement<T>(collection : T[]) : T {
    let length : number = collection.length;
    let index : number = Math.floor(Math.random() * length);
    return collection[index];
}