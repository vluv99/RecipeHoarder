import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRecipeListComponent } from './report-recipe-list.component';

describe('ReportRecipeListComponent', () => {
  let component: ReportRecipeListComponent;
  let fixture: ComponentFixture<ReportRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRecipeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
