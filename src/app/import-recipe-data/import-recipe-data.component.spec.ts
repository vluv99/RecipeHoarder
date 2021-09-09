import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRecipeDataComponent } from './import-recipe-data.component';

describe('ImportRecipeDataComponent', () => {
  let component: ImportRecipeDataComponent;
  let fixture: ComponentFixture<ImportRecipeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRecipeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportRecipeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
