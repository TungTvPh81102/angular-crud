import { Component } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { IProduct } from '../../../../interface';
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
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.products = product;
    });
  }

  handleRemove(id: string | number) {
    const comfirm = window.confirm('Ban co muon xoa khong?');

    if (comfirm) {
      this.productService.onHanleRemove(id).subscribe(() => {
        this.products = this.products.filter((product) => product.id !== id);
      });
    }
  }
}
