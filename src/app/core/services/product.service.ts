import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {Observable, throwError, zip} from 'rxjs';
import {CreateProductDTO, Product, UpdateProductDTO} from "../interfaces/product.interface";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl = `${environment.API_URL}/products`;

    constructor(
        private http: HttpClient
    ) {
    }

    getAll(limit?: number, offset?: number) {
        let params = new HttpParams();
        if (limit && offset) {
            params = params.set('limit', limit);
            params = params.set('offset', limit);
        }
        return this.http.get<Product[]>(this.apiUrl, {params})
            .pipe(
                retry(3),
                map(products => products.map(item => {
                    return {
                        ...item,
                        taxes: .19 * item.price
                    }
                }))
            );
    }

    getAllSingle(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl, {})
    }

    fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
        return zip(
            this.getOne(id),
            this.update(id, dto)
        );
    }

    getOne(id: string) {
        return this.http.get<Product>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === HttpStatusCode.Conflict) {
                        return throwError('Algo esta fallando en el server');
                    }
                    if (error.status === HttpStatusCode.NotFound) {
                        return throwError('El producto no existe');
                    }
                    if (error.status === HttpStatusCode.Unauthorized) {
                        return throwError('No estas permitido');
                    }
                    return throwError('Ups algo salio mal');
                })
            )
    }

    create(dto: CreateProductDTO) {
        return this.http.post<Product>(this.apiUrl, dto);
    }

    update(id: string, dto: UpdateProductDTO) {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: string) {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}
