import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDocumentComponent } from './details-document.component';

describe('DetailsDocumentComponent', () => {
  let component: DetailsDocumentComponent;
  let fixture: ComponentFixture<DetailsDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
