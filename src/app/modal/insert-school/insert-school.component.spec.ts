import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSchoolComponent } from './insert-school.component';

describe('InsertSchoolComponent', () => {
  let component: InsertSchoolComponent;
  let fixture: ComponentFixture<InsertSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertSchoolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
