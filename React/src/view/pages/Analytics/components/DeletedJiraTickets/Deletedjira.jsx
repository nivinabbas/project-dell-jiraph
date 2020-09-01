import React from 'react';
import "./DeletedJiraTickets.css";
import MainTable from "../MainTable/MainTable"

import Select from 'react-select'

import { useState , useEffect } from 'react';


function DeletedJira() {
  // Default Date 
  const date = new Date()
  const date1MonthAgo = new Date(new Date().setMonth(date.getMonth() - 1));

  // To set UiObj from the filtered Data we recieved from server 
  const [UiObjs, setUiObjs] = useState([]);

  // Options To Send == > Server 

const serverFilters={priority:[], functionalTest:[], label:["weekly"], qaRepresentative:[],startDate:[],endDate:[]};

//   const [ priority , setPriority ]=useState([])
//   const [ functionalTest , setfunctionalTest ]=useState([])
//   const [ label  , setLabel ]=useState([])
//   const [ qaRepresentative  , setQaRepresentative]=useState([])
//   const [ startDate,setStartDate ]=useState(date1MonthAgo)
//   const [ endDate,setEndDate ]=useState(date)
  

  

   // Options To get From Server 
    const [priorityOptions,setPriorityOptions]=useState([])
    const [qaRepresentativeOptions,setQaRepresentativeOptions]=useState([])
    const [functionalTestOptions,setfunctionalTestOptions]=useState([
          { name:"functionalTest" , value: "True"  ,   label: "True"} ,
          { name:"functionalTest" , value: "False"  ,   label: "False"} ,

         ])



   const [labelOptions, setLabelOptions] = useState([
   {name:"label" , value: "Daily"  ,   label: "Daily" },
   {name:"label" , value: "Weekly" ,   label: "Weekly" },
   {name:"label" , value: "Monthly",   label: "Monthly" },
   {name:"label" , value: "Yearly" ,   label: "Yearly" } 
  ])
  
 
  // Functions ==> Fetch : 

  const render = ()=> {
    fetch('/api/analytics/DeletedJiraTickets/---', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => { setUiObjs(data) })
  
      }
  

  useEffect(() => {
   
    fetch('/api/analytics/----')
      .then(res => res.json())
      .then(data => {
        
        //set state (news)
        setUiObjs(data);
      })

      fetch('/api/analytics/----')
      .then(res => res.json())
      .then(data => {
        
        //get priority options 
        setPriorityOptions(data);
      })
}, [])

  ///change priority:
  const HandlePriorityChange=(priority=>{
    console.log(priority.value)
    serverFilters.priority=[priority.value];
    

    render(serverFilters);
  })
  
  ///change functionaltest
  const HandlefunctionalTestChange=(status=>{
    serverFilters.status=[status.value];
        
           render(serverFilters);
  })
  ///change qaRepresentative:
  const HandleqaRepresentativeChange=(Qa=>{
    serverFilters.Qa=[Qa.value];
   
        render(serverFilters);
    })
   ///change StartDate:
  const HandleStartDateChange=(date=>{
    console.log(date)

    serverFilters.date=(date.target.value);
    render(serverFilters);
  })
   ///change EndDate:
  const HandleEndDateChange=(date=>{
    console.log(date.value)
    serverFilters.date=(date.target.value);
 

    render(serverFilters);
})
  /// change leLabel:
  const HandleLabelChange=(label=>{
      console.log(label.value)
      serverFilters.label=[label.value];


      render(serverFilters);
  })
 
  return (

    <div className='DeletedJiraTicketsWrapper'>
      <div className="DeletedJiraTickets__Table" >
                <MainTable changes={true}  />
              
          </div>
      <div className="DeletedJiraTickets__Title">Deleted Jira Tickets</div>
     
      {/* Select Filters */}

      <form className="DeletedJiraTickets__Filters">
     {/* select */}
        <Select 
        name="priority"
        options={priorityOptions} 
        placeholder="priority " 
        className="DeletedJiraTickets__Filter" 
        onChange={HandlePriorityChange}
        />
        
        <Select 
        name="functional test"
        isMulti
        options={functionalTestOptions} 
        placeholder="functional-Test " 
        className="DeletedJiraTickets__Filter"
        onChange={HandlefunctionalTestChange}
        />

        <Select 
        name="qaRepresentative"
        isMulti
        options={qaRepresentativeOptions} 
        placeholder="Qa Representative " 
        className="DeletedJiraTickets__Filter"
        onChange={HandleqaRepresentativeChange}
        />

        <input 
        className="DeletedJiraTickets__Filter" 
        type="date" 
        name="startDate" 
        onChange={HandleStartDateChange} 
        />


        <input 
        className="DeletedJiraTickets__Filter" 
        type="date" 
        name="endDate" 
        onChange={HandleEndDateChange} 
        />

        <Select 
        name="labels"
        options={labelOptions} 
        placeholder="Label" 
        className="DeletedJiraTickets__Filter" 
        onChange={HandleLabelChange} 
        />
    
      </form>
    </div>
  )
  }




export default DeletedJira;