import {ProductsService} from "./product.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CreateProductDTO, Product, UpdateProductDTO} from "../interfaces/product.interface";
import {generateManyProducts, generateOneProduct} from "../models/product.mock";
import {environment} from "../../../environments/environment";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {TokenService} from "./token.service";


fdescribe('ProductService', () => {
    let service: ProductsService;
    let httpMock: HttpTestingController;
    let tokService: TokenService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
        });
        service = TestBed.inject(ProductsService);
        httpMock = TestBed.inject(HttpTestingController);
        tokService = TestBed.inject(TokenService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Test for getAllSimple', () => {
        it('should return a product list', () => {
            const mockData: Product[] = generateManyProducts();
            // spyOn(tokService, 'getToken').and.returnValue('123');

            service.getAll().subscribe({
                next: (value) => {
                    expect(value.length).toEqual(mockData.length);
                    expect(value).toEqual(mockData);
                }
            })

            //* HTTP CONFIG
            const url = `${environment.API_URL}/products`;
            const req = httpMock.expectOne(url);
            const headers = req.request.headers
            // expect(headers.get('Authorization')).toEqual('Bearer 123');
            req.flush(mockData);
            httpMock.verify()
        });

        it('should return product list with taxes', () => {
            const mockData: Product[] = [
                {
                    ...generateOneProduct(),
                    price: 100,
                },
                {
                    ...generateOneProduct(),
                    price: 200,
                },
                {
                    ...generateOneProduct(),
                    taxes: -100,
                }
            ];
            service.getAll().subscribe({
                next: (value) => {
                    expect(value.length).toEqual(mockData.length);
                    expect(value[0].taxes).toEqual(19);
                    expect(value[1].taxes).toEqual(38);
                    expect(value[2].taxes).toEqual(0);
                }
            })

            //* HTTP CONFIG
            const url = `${environment.API_URL}/products`;
            const req = httpMock.expectOne(url);
            req.flush(mockData);
            httpMock.verify();
        });

        it('should handle error', () => {
            const mockLimit = 10;
            const mockOffset = 0;
            const mockData: Product[] = generateManyProducts();
            service.getAll(mockLimit, mockOffset).subscribe({
                next: value => {
                },
                error: (error: string) => {
                    expect(error).toBe('Ups algo salio mal');
                }
            });
            const url = `${environment.API_URL}/products`;
            const req = httpMock.expectOne(`${url}`);
            req.flush(mockData);
            expect(req.request.method).toBe('GET');
            httpMock.verify()
        });
    })

    describe('Test for create', () => {
        it('should  return a new product',  () => {
            const mockData = generateOneProduct();
            const dto: CreateProductDTO = {
                title:'new product',
                categoryId: 12,
                description: 'xd',
                images: ['', ''],
                price: 100
            }

            service.create(dto).subscribe({
                next: (value) => {
                    expect(value).toEqual(mockData);
                }
            });

            //*********** HTTP CONFIG *********
            const url = `${environment.API_URL}/products`;
            const req = httpMock.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('POST');
            httpMock.verify()
        });
    });

    describe('Test for update', () => {
        test('should update a product', function () {
            const mockData = generateOneProduct();
            const dto: UpdateProductDTO = {
                title: 'new product'
            }
            const productId: string = '1';

            service.update(productId, dto).subscribe({
                next: value => {
                    expect(value).toEqual(mockData);
                }
            })
            //*********** HTTP CONFIG *********
            const url = `${environment.API_URL}/products/${productId}`;
            const req = httpMock.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('PUT');
            httpMock.verify()
        });
    });

    describe('Test for delete',  () => {
        it('should delete a product',  () => {
            const mockData = true;
            const productId: string = '1';

            service.delete(productId).subscribe({
                next: value => {
                    expect(value).toEqual(mockData);
                }
            })
            //*********** HTTP CONFIG *********
            const url = `${environment.API_URL}/products/${productId}`;
            const req = httpMock.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('DELETE');
            httpMock.verify()
        });
    });

    describe('Test for getOne', () => {
        it('should return a product', () => {
            const mockData = generateOneProduct();
            const productId: string = '1';

            service.getOne(productId).subscribe({
                next: value => {
                    expect(value).toEqual(mockData);
                }
            })
            //*********** HTTP CONFIG *********
            const url = `${environment.API_URL}/products/${productId}`;
            const req = httpMock.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('GET');
            httpMock.verify()
        });


        it('should return the right msg when the status code is 404',  () => {
            const productId: string = '1';
            const msgError = '404 msg';
            const mockData = {
                status: HttpStatusCode.NotFound,
                statusText: msgError,
            }

            service.getOne(productId).subscribe({
                next: () => {},
                error: (error: HttpErrorResponse) => {
                    expect(error).toEqual('El producto no existe');

                }
            })
            //*********** HTTP CONFIG *********
            const url = `${environment.API_URL}/products/${productId}`;
            const req = httpMock.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('GET');
            httpMock.verify()
        });
    });

})
