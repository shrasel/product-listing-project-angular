import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productId!: number;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe(
        (updatedProduct: Product) => {
          console.log('Product updated:', updatedProduct);
          // You can add a success message or navigation logic here
        },
        (error) => {
          console.error('Error updating product:', error);
          // You can add error handling here
        }
      );
    }
  }
}
