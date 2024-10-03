import { Injectable } from '@angular/core';
import { IProduct } from '../interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API = 'http://localhost:3000/products';
  products!: IProduct;
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProduct[]>(this.API);
  }

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API}/${id}`);
  }

  remove(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

  handleAdd(data: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.API, data);
  }

  handlEdit(data: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.API}/${data.id}`, data);
  }
}
