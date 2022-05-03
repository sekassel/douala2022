import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetriveFormComponent } from './retrive-form.component';

describe('RetriveFormComponent', () => {
  let component: RetriveFormComponent;
  let fixture: ComponentFixture<RetriveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetriveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetriveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
