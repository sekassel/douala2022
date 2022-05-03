import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyTeamComponent } from './manage-my-team.component';

describe('ManageMyTeamComponent', () => {
  let component: ManageMyTeamComponent;
  let fixture: ComponentFixture<ManageMyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMyTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
