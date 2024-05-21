import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSplashComponent } from './preview-splash.component';

describe('PreviewSplashComponent', () => {
  let component: PreviewSplashComponent;
  let fixture: ComponentFixture<PreviewSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSplashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
