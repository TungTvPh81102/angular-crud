import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productForm!: FormGroup;

  constructor(
    private productServices: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      image: ['', Validators.required],
      quantity: [0],
      description: [''],
    });
  }

  handleSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productServices.handleAdd(this.productForm.value).subscribe(() => {
      alert('Them san pham thanh cong');
      this.productForm.reset();
      this.router.navigate(['/products']);
    });
  }
}
