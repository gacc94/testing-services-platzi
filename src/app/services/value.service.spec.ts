import {TestBed} from '@angular/core/testing';

import {ValueService} from './value.service';
import {firstValueFrom} from "rxjs";

fdescribe('ValueService', () => {
    let service: ValueService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({});
        service = new ValueService();
    });

    it('should be create', () => {
        expect(service).toBeTruthy();
    });

    describe('Tests for getValue', () => {
        it('should return "my value"', () => {
            expect(service.getValue()).toBe('my value')
        });
    });

    describe('Test for seValue', () => {
        it('should change the value', () => {
            expect(service.getValue()).toBe('my value')
            service.setValue('change');
            expect(service.getValue()).toBe('change')
        });
    });

    describe('Tests for getPromiseValue', () => {
        it('should return "my value" from promise', () => {
            service.getPromiseValue().then((value) => {
                expect(value).toBe(service.getValue());
            })
        });

        it('should return "my value" from promise', async () => {
            const value = await service.getPromiseValue();
            expect(value).toBe(service.getValue());
        });
    });

    describe('Test for getObservableValue', () => {
        it('should return "my value" from observable', async () => {
            const value: string = await firstValueFrom(service.getObservableValue());
            expect(value).toBe(service.getValue());
        });
    })

});
