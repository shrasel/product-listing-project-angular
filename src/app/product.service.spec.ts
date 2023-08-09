import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './product.model';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should retrieve a single product by ID', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Mock Product',
      description: 'Mock Product Description',
      price: 99.99
    };

    productService.getProductById(1).subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/products/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    const updatedProductData: Product = {
      id: 1,
      name: 'Updated Product',
      description: 'Updated Product Description',
      price: 129.99
    };

    productService.updateProduct(updatedProductData).subscribe((updatedProduct: Product) => {
      expect(updatedProduct).toEqual(updatedProductData);
    });

    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/products/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedProductData);
  });

  it('should delete a product', () => {
    productService.deleteProduct(1).subscribe(() => {
      // The delete request is successful, no need to check the response here
    });

    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/products/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
