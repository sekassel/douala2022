import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingTeamComponent } from './creating-team.component';

describe('CreatingTeamComponent', () => {
  let component: CreatingTeamComponent;
  let fixture: ComponentFixture<CreatingTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
