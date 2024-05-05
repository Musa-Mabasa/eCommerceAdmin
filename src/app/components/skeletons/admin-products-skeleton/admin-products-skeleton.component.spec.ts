import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsSkeletonComponent } from './admin-products-skeleton.component';

describe('AdminProductsSkeletonComponent', () => {
  let component: AdminProductsSkeletonComponent;
  let fixture: ComponentFixture<AdminProductsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProductsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
