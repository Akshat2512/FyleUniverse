import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormType } from './wo-table';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AppComponent, BrowserAnimationsModule],
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the workout app', () => {

    expect(component).toBeTruthy();
  });

  it(`should render input-form`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-input-form')).not.toBeNull();
  });

  it('should render search-form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-search')).not.toBeNull();
  });

  it('should render analysis-form', () => {

    //Arrange
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-analysis')).not.toBeNull();
  });

  it('should recieve data from input-form', ()=>{
    //Arrange
    const newData = {
      name:'Akshat',
      workout_type:'Running',
      minutes:4
    };
    
    //Act
    component.receiveData(newData);

    //Assert
    expect(component.tableData).toEqual(newData);
  })

});
