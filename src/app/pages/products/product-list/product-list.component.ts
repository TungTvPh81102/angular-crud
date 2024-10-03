import { Component } from '@angular/core';
import { IProduct } from '../../../interface';
import { ProductsService } from '../../../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products!: IProduct[];

  constructor(private productServices: ProductsService) {}

  ngOnInit() {
    this.productServices.getProducts().subscribe((product) => {
      this.products = product;
    });
  }

  handleRemove = (id: number) => {
    const comfirm = window.confirm('Are you sure?');

    if (comfirm) {
      this.productServices.remove(id).subscribe(() => {
        this.products = this.products.filter((item) => item.id !== id);
        alert('Xoa san pham thanh cong');
      });
    }
  };
}
