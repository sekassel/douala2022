import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdforgottenComponent } from './pwdforgotten.component';

describe('PwdforgottenComponent', () => {
  let component: PwdforgottenComponent;
  let fixture: ComponentFixture<PwdforgottenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdforgottenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdforgottenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
