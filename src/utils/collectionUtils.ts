import Domain from "../domain/domain";

export function isIn<T extends Domain>(object : T, collection : T[]) : boolean {
    for (let o of collection){
        if (o.equals(object)){
            return true;
        }
    }
    return false;
}

export function isNotIn<T extends Domain>(object : T, collection : T[]) : boolean {
    return !isIn(object, collection);
}