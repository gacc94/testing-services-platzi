import {TestBed} from '@angular/core/testing';

import {MapsService} from './maps.service';

describe('MapsService', () => {
    let service: MapsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MapsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Test for getCurrentPosition', () => {
        it('should save the center position', function () {
            spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((args) => {
                const mockGeolocation = {
                    coords: {
                        accuracy: 0,
                        altitude: 0,
                        altitudeAccuracy: 0,
                        heading: 0,
                        latitude: 1000,
                        longitude: 2000,
                        speed: 0
                    },
                    timestamp: 0,
                }
                args(mockGeolocation);
            });
            service.getCurrentPosition();
            expect(service.center.lat).toEqual(1000);
            expect(service.center.lng).toEqual(2000);


        });


    });

});
