import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNameBarComponent } from './recipe-name-bar.component';

describe('RecipeNameBarComponent', () => {
  let component: RecipeNameBarComponent;
  let fixture: ComponentFixture<RecipeNameBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeNameBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeNameBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
