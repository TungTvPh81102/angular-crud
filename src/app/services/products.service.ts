import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API = 'http://localhost:3000/products';
  products!: IProduct[];
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API}`);
  }

  onHandleAdd(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.API}`, product);
  }

  getProductById(id: string | number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API}/${id}`);
  }

  onHandleUpdate(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.API}/${product.id}`, product);
  }

  onHanleRemove(id: string | number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
