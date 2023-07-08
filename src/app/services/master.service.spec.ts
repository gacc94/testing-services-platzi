import {MasterService} from './master.service';
import {TestBed} from "@angular/core/testing";
import {ValueService} from "./value.service";

describe('MasterService', () => {
    let service: MasterService;
    let valueServSpy: jest.SpyInstance<any, []>;
    let valueService: ValueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MasterService,
                ValueService
            ]
        });
        service = TestBed.inject(MasterService);
        valueService = TestBed.inject(ValueService);
        valueServSpy = jest.spyOn(valueService, 'getValue');
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should return "my value" from the real service', () => {
        expect(service.getValue()).toBe('my value')

    });

    // it('should return "my value" from the real service', () => {
    //     const fakeValueServ = new ValueFakeService();
    //     const masterServ = new MasterService(fakeValueServ as unknown as ValueService);
    //     expect(masterServ.getValue()).toBe('fake value')
    //
    // });

    // it('should return "my value" from the real object', () => {
    //     const fake = {getValue: () => 'fake from obj'};
    //     const masterServ = new MasterService(fake as ValueService);
    //     expect(masterServ.getValue()).toBe('fake from obj')
    //
    // });

    it('should call to getValue from ValueService', async () => {
    //     const valueServ = new ValueService();
    //     const spy = jest.spyOn(valueServ, "getValue");
        // const spyJasmine = createSpyObj('ValueService', ['getValue']);
        // spyJasmine.getValue.and.returnValue('fake value');
        // const masterServ = new MasterService(spyJasmine);
        // expect(masterServ.getValue()).toBe('fake value');
        // expect(spyJasmine.getValue()).toHaveBeenCalled();
        // expect(spyJasmine.getValue()).toHaveBeenCalledTimes(1);
        // await valueServ.getPromiseValue();
        // expect(spy.getMockName()).toHaveBeenCalledWith('Before calling getUser');
        // valueServSpy.getMockName()
        //
        // expect(valueServSpy.getMockName()).toHaveBeenCalled();

    });




});
