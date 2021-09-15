import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFieldsComponent } from './step-fields.component';

describe('StepFieldsComponent', () => {
  let component: StepFieldsComponent;
  let fixture: ComponentFixture<StepFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
