import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  productForm: FormGroup;
  constructor(
    private formBulider: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.productForm = this.formBulider.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]], 
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      published: [false, Validators.required],
      in_stock: [true, Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((product) => {
      this.productForm.patchValue(product);
    })
  }

  onHandSubmit() {
    if (this.productForm.invalid) return;
    const id = +this.activeRoute.snapshot.params['id'];
    this.productService.onHandleUpdate({...this.productForm.value, id}).subscribe({
      next: () => {
        alert('Cap nhat san pham thanh cong!');
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
