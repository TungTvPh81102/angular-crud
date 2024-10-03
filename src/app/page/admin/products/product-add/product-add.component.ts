import { Component } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { IProduct } from '../../../../interface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productForm: FormGroup;
  constructor(
    private formBulider: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {
    this.productForm = this.formBulider.group({
      name: ['', Validators.required],
      price: [
        '',
        [
          Validators.required,
          Validators.min(0), // Ensures price is not negative
        ],
      ],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      published: [false, Validators.required],
      in_stock: [true, Validators.required],
      description: [''],
    });
  }

  onHandSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productService.onHandleAdd(this.productForm.value).subscribe({
      next: () => {
        alert('Them san pham thanh cong!');
        this.productForm.reset();
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
