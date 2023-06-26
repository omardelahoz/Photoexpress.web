import { ErrorDictionary } from "./errorDictionary";

export interface Result<T> {
    resultList: Array<T>;
    resultObject: T;
    total: number;
    message: string;
    status: number;
    result: boolean;
    errors: Array<ErrorDictionary>
}