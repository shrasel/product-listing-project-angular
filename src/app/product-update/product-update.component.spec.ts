import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductUpdateComponent } from './product-update.component';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Mock Product',
    description: 'Mock Product Description',
    price: 99.99
  };

  beforeEach(() => {
    // Create a spy object for the ProductService
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductById', 'updateProduct']);

    TestBed.configureTestingModule({
      declarations: [ProductUpdateComponent],
      imports: [FormsModule], // Add FormsModule to the imports
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }, // Mock ActivatedRoute
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;

    // Mock the getProductById method to return the mock product
    productServiceSpy.getProductById.and.returnValue(of(mockProduct));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product details in the form', () => {
    expect(fixture.nativeElement.querySelector('#name').value).toBe(mockProduct.name);
    expect(fixture.nativeElement.querySelector('#description').value).toBe(mockProduct.description);
    expect(fixture.nativeElement.querySelector('#price').value).toBe(String(mockProduct.price));
  });

  it('should update product when form is submitted', () => {
    const updatedProduct: Product = { ...mockProduct, name: 'Updated Product' };

    productServiceSpy.updateProduct.and.returnValue(of(updatedProduct));

    fixture.nativeElement.querySelector('#name').value = 'Updated Product';
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(productServiceSpy.updateProduct).toHaveBeenCalledWith(updatedProduct);
  });
});
