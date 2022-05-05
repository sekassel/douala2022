import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeNotificationComponent } from './challenge-notification.component';

describe('ChallengeNotificationComponent', () => {
  let component: ChallengeNotificationComponent;
  let fixture: ComponentFixture<ChallengeNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
