import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  productForm!: FormGroup;

  constructor(
    private productServices: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      quantity: [0],
      description: [''],
    });
  }

  ngOnInit() {
    const id = this.activeRouter.snapshot.params['id'];
    this.productServices.getById(id).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  }

  handleSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const id = +this.activeRouter.snapshot.params['id'];
    this.productServices
      .handlEdit({ ...this.productForm.value, id })
      .subscribe(() => {
        alert('Cap nhat san pham thanh cong');
        this.router.navigate(['/products']);
      });
  }
}
