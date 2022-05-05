import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InputDialogComponent } from './input-dialog.component';

describe('InputDialogComponent', () => {
  let component: InputDialogComponent;
  let fixture: ComponentFixture<InputDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
