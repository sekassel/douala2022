import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuLogComponent } from './sudoku-log.component';

describe('SudokuLogComponent', () => {
  let component: SudokuLogComponent;
  let fixture: ComponentFixture<SudokuLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
