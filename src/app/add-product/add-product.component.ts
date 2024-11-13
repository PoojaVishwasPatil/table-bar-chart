import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm: FormGroup;
  name: string = '';
  price: string = '';
  category: string = '';
  dialogTitle: string = '';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    // console.log(data.product);
    
    this.productForm = this.fb.group({
      id: [data.product?.id || ''],
      name: [data.product?.name || '', Validators.required],
      price: [data.product?.price || '', [Validators.required, Validators.min(0)]],
      category: [data.product?.category || '', Validators.required]
    });

    this.dialogTitle = data.title
    // console.log(this.productForm.value);
    // console.log(data.product?.name);
  }

  add(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      // console.log(newProduct);
      
      this.dialogRef.close(newProduct);
    } else {
      console.log('Form is invalid');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
