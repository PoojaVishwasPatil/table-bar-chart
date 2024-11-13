import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { AddProductComponent } from './add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { colorSets, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, TableModule, ToolbarModule,ReactiveFormsModule, NgxChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'table-bar-chart';
  products = [
    { id: 1, name: 'Product 1', price: 100, category: 'Category A' },
    { id: 2, name: 'Product 2', price: 200, category: 'Category B' },
    { id: 3, name: 'Product 3', price: 150, category: 'Category C' }
  ];
  
  barChartData: any[] = [];
  colorScheme = colorSets[5]; 
  filteredProducts = [...this.products];
  searchTerm = '';

  constructor(public dialog: MatDialog,) {
    this.updateChartData();
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddProductComponent,{
      data:{
        title:'Add Product'
      }
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        newProduct.id = this.products.length + 1;
        this.products.push(newProduct);
        this.updateChartData(); 
        this.updateFilteredProducts();
      }
    });
  }

  onEdit(product: any): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        product: product,
        title:'Edit Product'
      }
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      // console.log(updatedProduct);
      
      if (updatedProduct) {
        console.log(updatedProduct);
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        // console.log(index);
        
        if (index !== -1) {          
          this.products[index] = updatedProduct;
          this.updateChartData(); 
          this.updateFilteredProducts();
        }
      }
    });
  }

  onDelete(product: any) :void{
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01e2ee',
      cancelButtonColor: '#ff6060',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products.splice(index, 1);
          this.updateChartData();
          this.updateFilteredProducts(); 
        }
      }
    });
  }

  updateChartData(): void {
    this.barChartData = this.products.map(product => ({
      name: product.name,
      value: product.price
    }));

    // console.log(this.barChartData);
  }


  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.price.toString().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }

  updateFilteredProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.price.toString().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }
  
}
