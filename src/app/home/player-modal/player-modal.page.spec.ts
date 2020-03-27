import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerModalPage } from './player-modal.page';

describe('PlayerModalPage', () => {
  let component: PlayerModalPage;
  let fixture: ComponentFixture<PlayerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
