import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoTable, WoTable } from '../wo-table';
import { SimpleChanges, ɵɵNgOnChangesFeature } from '@angular/core';




describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.service.USER_DATA = TestData;
  });

  it('should create search form', () => {
    expect(component).toBeTruthy();
  });
  

  const TestData: WoTable[] = [{
    id:1,
    name:'Akshat',
    workouts:[
      {type:'Running', minutes:30},
      {type:'Cycling', minutes:50}
    ]
  },{
    id:2,
    name:'Daniel',
    workouts:[
      {type:'Running', minutes:40},
      {type:'Swimming', minutes:25}
    ]
  }, 
  {
    id:3,
    name:'Vijay',
    workouts:[
      {type:'Yoga', minutes:55},
      {type:'Cycling', minutes:30}
    ]
  },
  {
    id:4,
    name:'Lakshay',
    workouts:[
      {type:'Yoga', minutes:55},
      {type:'Cycling', minutes:30}
    ]
  },
  {
    id:5,
    name:'Dakota',
    workouts:[
      {type:'Yoga', minutes:55},
      {type:'Cycling', minutes:30}
    ]
  }
]

it('should check multiple options if selected', ()=>{
  //Arrange
  const options = ['Running', 'Swimming', 'Yoga', 'Cycling'];

  //Act
  component.workouts.setValue(options);

  //Assert
  expect(component.workouts.value).toEqual(options);
})

it("should check selected options being updated in table",()=>{
  //Arrange
  const selectedOption = 'Running'

  //Act
   component.SelectedOptions(selectedOption)
  
  //Assert
   component.FilterWorkoutList.forEach(e => {
   
      expect(e.workout_type).toEqual('Running');
   })
});

  
} );

