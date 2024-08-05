import { TestBed } from '@angular/core/testing';

import { WorkoutService } from './workout.service';
import { WoTable } from '../wo-table';
import { asNativeElements, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs';

describe('WorkoutService', () => {
  let service: WorkoutService;
  
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
      {type:'Swimming', minutes:30}
    ]
  },
  {
    id:5,
    name:'Dakota',
    workouts:[
      {type:'Running', minutes:55},
      {type:'Cycling', minutes:30}
    ]
  }
]


  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);

    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    // Mock local storage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {});

    service.USER_DATA = TestData;
  });
  
  afterEach(() => {
    (localStorage.getItem as jasmine.Spy).calls.reset();
    (localStorage.setItem as jasmine.Spy).calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  
  it("should check localStorage if it's user's first time and then save data in the local storage", () => {

    //Arrange

    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem')

    //Act
    service.checkLocalStorage();

    //Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
    expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify(TestData));

  })
  
  it("should check localStorage and retrieve saved data from the local storage", () => {

    //Arrange
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(TestData));

    //Act
    service.checkLocalStorage();

    //Assert
    expect(service.USER_DATA).toEqual(TestData);


  })


  it('should add new user on form submit in the table', ()=>{

  //Arrange
   var formData = {name:'Michael', workout_type:'Cycling', minutes:35};     // new form submission data
   const changes: SimpleChanges =  {
      formData:{
          currentValue: formData,
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
   }

  //Act
   service.updateTableonsubmit(changes);
   service.onSelectionChange(['Cycling', 'Running'],formData.name);

   //Assert
   expect(service.FilterWorkoutList[0].name).toEqual(formData.name)   //expecting new added user

  })


it(`should update user's workout time on form submit`, ()=>{

//Arrange
var formData = {name:'Daniel', workout_type:'Swimming', minutes:10};     // new form submission data
var changes: SimpleChanges =  {
    formData:{
        currentValue: formData,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
}

 //Act
 service.updateTableonsubmit(changes);

 //Assert
 var find_user = service.USER_DATA.filter(f => f.name === formData.name);
 var find_user_minutes = find_user[0].workouts.filter(f => f.type === formData.workout_type);

 expect(find_user[0].name).toEqual(formData.name);   // expecting user has been updated 
 expect(find_user_minutes[0].minutes).toEqual(35);
  
})

it(`should update user's workout on form submit`, ()=>{
  
const formData = {name:'Daniel', workout_type:'Yoga', minutes:40};     // new form submission data
const changes =  {
    formData:
      {
        currentValue: formData,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
}

 //Act
 service.updateTableonsubmit(changes);

 //Assert
 var find = service.USER_DATA.filter(f => f.name === formData.name);
 expect(find[0].workouts[find[0].workouts.length-1].type).toEqual(formData.workout_type);   
})

it('should select either all or other options',()=>{
                                    
var select = 'All';               // option=['All']   
service.ModifyMatSelect(select);       // option = [] ,  Assuming 'All' option is already selected so calling this function deselect
expect(service.options).toEqual([]);   

service.ModifyMatSelect(select);    // option=['All']
expect(service.options).toEqual(['All']);  

select = 'Running';        
service.ModifyMatSelect(select);   // option = ['Running']
expect(service.options).toEqual(['Running']);  

select = 'Cycling';
service.ModifyMatSelect(select);    // option = ['Running','Cycling']
expect(service.options).toEqual(['Running','Cycling']);

select = 'Swimming';
service.ModifyMatSelect(select);    // option = ['Running', 'Cycling', 'Swimming']
expect(service.options).toEqual(['Running', 'Cycling', 'Swimming']);

select = 'Swimming';
service.ModifyMatSelect(select);    // option = ['Running', 'Cycling']
expect(service.options).toEqual(['Running', 'Cycling']);

select = 'All';
service.ModifyMatSelect(select);    // option=['All']
expect(service.options).toEqual(['All']);  


})

it('should filter Table based on searches', ()=> {

  //Arrange 
  // var options = ['Cycling', 'Running', 'Yoga', 'Swimming'];
  service.compute_table();
  const searchresults : { [key: string]: string[] } = {     
     'A' : ['Dakota','Lakshay','Vijay','Daniel','Akshat'],  
     'Ak' :  ['Dakota','Lakshay','Akshat'],     // all names containing substring 'Ak'
     'Aksha' : ['Lakshay', 'Akshat'],
     "Akshat" : ['Akshat'],
     'Akshat k' : []                  
  }


  Object.keys(searchresults).forEach(search => {
    
    //Act
    service.SearchByName(service.TABLE_DATA, search);

    //Assert
    var names:string[] = [];
    service.FilterNameList.forEach(e => names.push(e.name))
    expect(names).toEqual(searchresults[search])                      
  })

});


it('should filter Table based on workout options and search', ()=> {
  
  //Arrange
  service.compute_table();
  var options: string[] = ['Cycling'];

  //Act
  service.onSelectionChange(options, '');  

  //Assert
  service.FilterWorkoutList.forEach(e => {
        expect(e.workout_type.split(',').includes(options[0])).toBeTruthy()
        expect(['Dakota','Lakshay','Vijay','Daniel','Akshat'].includes(e.name)).toBeTruthy()
  })

  //Arrange
  options = ['Running', 'Swimming']

    //Act
    service.onSelectionChange(options, 'Da'); 

  //Assert
  service.FilterWorkoutList.forEach(e => {

    var wouts: string[] = e.workout_type.split(',');
    expect(wouts.includes(options[0]) || wouts.includes(options[1])).toBeTruthy()
    expect(['Dakota','Daniel'].includes(e.name)).toBeTruthy()
  })
  
});

it('should list names for handling graph',()=>{
  //Arrange
  service.compute_table();
  var data = service.TABLE_DATA;

  //Act
   service.handleListItemClick(data)

   //Assert
   data.forEach(nm=>{
    expect(service.names.includes(nm.name)).toBeTruthy()
   })

})

it('should handle graph on click list of names',()=>{
  //Arrange
    spyOn(service, 'updateGraph');
    service.compute_table();
    service.updateData = service.TABLE_DATA;

  //Act
    var name= 'Daniel';
    service.SelectItemClick(name);

   //Assert
     expect(service.updateGraph).toHaveBeenCalledWith(name);
     expect(service.heading).toEqual(`${name}'s workout progress`);
   });


})


