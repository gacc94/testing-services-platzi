import {ProductsService} from "./product.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Product} from "../interfaces/product.interface";


fdescribe('ProductService', () => {
    let service: ProductsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
        });
        service = TestBed.inject(ProductsService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    //
    // afterEach(() => {
    //     httpMock.verify();
    // });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Test for getAllSimple', () => {
        it('should return a product list', () => {
            const mockData: Product[] = [
                {
                    id: '21',
                    title: 'tgg',
                    price: 12,
                    description: 'ads',
                    category: {
                        id: 112,
                        name: 'sd'
                    },
                    images: ['img', 'img']
                }


            ];
            service.getAll().subscribe({
                next: (value) =>  {
                    expect(value.length).toEqual(mockData.length);
                }
            })

        });
    })

})
