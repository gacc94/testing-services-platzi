import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ValueFakeService {

    private fakeValue = 'fake value';

    constructor() {
    }

    getValue() {
        return this.fakeValue;
    }

    setValue(value: string): void {
        this.fakeValue = value;
    }

    getPromiseValue() {
        return new Promise((resolve, reject) => {
            resolve(this.fakeValue);
        })
    }

    getObservableValue() {
        return of(this.fakeValue);
    }

}
