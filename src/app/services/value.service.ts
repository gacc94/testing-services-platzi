import {Injectable} from '@angular/core';
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ValueService {

    private value = 'my value'

    constructor() {
    }

    getValue() {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
    }

    getPromiseValue() {
        return new Promise((resolve, reject) => {
            resolve(this.value);
        })
    }

    getObservableValue() {
        return of(this.value);
    }

}
