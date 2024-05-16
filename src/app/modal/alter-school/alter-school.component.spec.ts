import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterSchoolComponent } from './alter-school.component';

describe('AlterSchoolComponent', () => {
  let component: AlterSchoolComponent;
  let fixture: ComponentFixture<AlterSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterSchoolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
