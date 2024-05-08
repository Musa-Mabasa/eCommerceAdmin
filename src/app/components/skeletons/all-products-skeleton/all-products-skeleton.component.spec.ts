import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsSkeletonComponent } from './all-products-skeleton.component';

describe('AllProductsSkeletonComponent', () => {
  let component: AllProductsSkeletonComponent;
  let fixture: ComponentFixture<AllProductsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllProductsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
