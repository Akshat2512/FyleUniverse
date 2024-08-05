import { Injectable, SimpleChanges } from '@angular/core';
import { CoTable, workouts, WoTable } from '../wo-table';


@Injectable({
  providedIn: 'root'
})

export class WorkoutService {
 
 
  public USER_DATA:WoTable [] =  [ 
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Swimming', minutes: 50 },
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 43 }
      ]
    },
    {
      id: 4,
      name: 'Dakota Fanning',
      workouts: [
        { type: 'Yoga', minutes: 40 },
        { type: 'Cycling', minutes: 30 },
        { type: 'Running', minutes: 20 }
      ]
}];
  
   constructor() { }


  public putOptions(): string[]{

        return ['Cycling', 'Running', 'Swimming', 'Yoga'];
    }

      
  checkLocalStorage(){
    try{
      var userData = localStorage.getItem('userData');
      if(userData == null)
      {
        userData = JSON.stringify(this.USER_DATA);
        localStorage.setItem('userData', userData);
        this.USER_DATA = JSON.parse(userData);
      }
      else
      {
        this.USER_DATA = JSON.parse(userData);
      }
    }
    catch(e){

    }

    }
  
    
  updateLocalStorage(){
      var userData = JSON.stringify(this.USER_DATA);
      localStorage.setItem('userData', userData);
  }

  
  updateTableonsubmit(changes: SimpleChanges) {
    this.checkLocalStorage();
    const formData = changes['formData'].currentValue;

    if (changes['formData'] && formData) {
                     
      let i;
        for(i=0; i<this.USER_DATA.length;i++)
          {
                 if(this.USER_DATA[i].name == formData.name)
                 {
                  break;
                 }
          }

         if(i==this.USER_DATA.length)
         {
          this.USER_DATA.push({id: i+1, name: formData.name, workouts: [{type: formData.workout_type, minutes: formData.minutes}] })

          alert('Submitted Successfully!!');
           
         }
         else
         {
              var wo_len =  this.USER_DATA[i].workouts.length;
              let j;
              for(j=0;j<wo_len;j++)
              {
                if(this.USER_DATA[i].workouts[j].type == formData.workout_type)
                {
                  break;
                }
              }
              if(j == this.USER_DATA[i].workouts.length)
              {
                this.USER_DATA[i].workouts.push({type: formData.workout_type, minutes: formData.minutes})
              }
              else{
                this.USER_DATA[i].workouts[j].minutes = this.USER_DATA[i].workouts[j].minutes+ formData.minutes;
              }
 
              alert(`Updated Successfully !!`);
            
         }

         this.updateLocalStorage();

    }
  }

  
  TABLE_DATA: CoTable[] = []
 
 public compute_table(){     // Generate new DataSource for Table according to Table Columns from USER_DATA

  
    var i=this.USER_DATA.length-1;
    
    this.USER_DATA.forEach(e => {
      this.TABLE_DATA[i]= { id: 0, name: '', workout_type:'', workout_no: 0, workout_time: 0, workouts: [] };
      this.TABLE_DATA[i].id = e.id;
      this.TABLE_DATA[i].name = e.name;
 
      var sum=''; 
      e.workouts.forEach(f=>{
        this.TABLE_DATA[i].workouts.push(f);
      })
      
      e.workouts.forEach(s => 
        { sum+=s.type+', ' }
      );
      sum=sum.slice(0,-2);
      this.TABLE_DATA[i].workout_type = sum;
    
      this.TABLE_DATA[i].workout_no = e.workouts.length;
      var time=0; 
     
        e.workouts.forEach(s => 
          { time += s.minutes; }
        );
       this.TABLE_DATA[i].workout_time = time;

     i--;
     
    })


  }

  FilterNameList: CoTable[] = [];
  
  SearchByName(data: CoTable[], name: string) {
   
    this.FilterNameList = []
  
    var keyword;
    if(name)
      keyword = (name as string).toLowerCase().replaceAll(" ","");
    else
   { keyword = '(?:)' }
      
    const regex = new RegExp(`${keyword}`);
    console.log(regex);

   
    data.forEach(e => {
      if(regex.test(e.name.toLowerCase().replaceAll(" ","")))
        this.FilterNameList.push(e)
     })
     
     return this.FilterNameList;

  }
   

options: string[] = ['All'];

 ModifyMatSelect(select: string) // This function either select option if new option is selected or deselect option if same is selected again
 {
  if(select == 'All')
  {
    if(this.options.includes(select))
       this.options.pop();
    else{
        this.options = ['All'];
    }
  
  }
  else{
    this.options = this.options.filter(f => f!=='All')
    if(this.options.includes(select))
      this.options = this.options.filter(f => f!==select)
   else{
       this.options.push(select);
      }
  }
 }

 
  woutList: string[] = ['All','Cycling', 'Running', 'Swimming', 'Yoga'];

  FilterWorkoutList: CoTable[] = []

  onSelectionChange(select: string[], name: string) {   // Function to modify Table data and Graph data based on selected option(s) and search 

   var selectedValues =  select;                                    // modify mat-select

   
    this.compute_table();
    this.FilterWorkoutList = []
    
    if(select.includes('All') && select.length == 1)
    {
      selectedValues = this.woutList.filter(f => f!=='All');
    }


    this.TABLE_DATA.forEach(e =>{     

            var work_type: string[] = [];
            var work_time = 0;

            e.workouts.forEach(f=>{
              if(selectedValues.includes(f.type))
               {  
                 work_type.push(f.type);  
                 work_time += f.minutes;
               }
           
            })
         
            e.workout_no = work_type.length;
            e.workout_type = work_type.join(', ')
            e.workout_time = work_time
      

            if(e.workout_type.length != 0)
              this.FilterWorkoutList.push(e)
  
         });
     
         this.FilterWorkoutList = this.SearchByName(this.FilterWorkoutList, name)  

         return this.FilterWorkoutList ;
         
  }

//Graphs Analysis

heading: string = '';

names: string[] = [];

  
basicData: any;

basicOptions: any = {
       scales: {
       y: {
          beginAtZero: true,
          grid: {
              drawBorder: false
          }
        },
       x: {
          grid: {
              drawBorder: false
          }}
         },
  layout: {
    padding: {
        top: 100,
    },
},
};

 updateData: CoTable[]=[];

handleListItemClick(data: CoTable[]){
    this.updateData = data;
    this.names = [];
   
    data.forEach(e => {
     this.names.push(e.name);
     });
    
  }
 
  SelectItemClick(name: string){
       this.updateGraph(name)
       this.heading = name+"'s workout progress";
  }
 

  updateGraph(name: string)
  {
    var labels: string[] = [];
    var data: number[] = [];
     let i;
 
     for(i=0;i<this.updateData.length;i++){
         if(this.updateData[i].name === name )
         {
             break;
         }
     }
  this.updateData[i].workouts.forEach((e: workouts) =>{
         labels.push(e.type);
         data.push(e.minutes);
       })

     
    
  this.basicData = {
        "labels": labels,
        "datasets": [
            {
                "label": "Minutes",
                "data": data,
                "backgroundColor": "rgba(54, 162, 235, 0.5)",
                "borderColor": "rgb(54, 162, 235)",
                "borderWidth": 1
            }
        ]
    }
   
  }
 
  


      }
