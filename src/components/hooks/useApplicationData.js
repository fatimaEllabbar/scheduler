import { useState , useEffect } from "react"; 

const axios=require('axios');

export default function useApplicationData() {

    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });

    function load() {
        Promise.all([
          axios.get('http://localhost:8001/api/days'),
          axios.get('http://localhost:8001/api/appointments'),
          axios.get('http://localhost:8001/api/interviewers')
        ]).then((all) => {
          const [days, appointments, interviewers] = all;
          setState(prev => ({...prev, days: days.data,  appointments:  appointments.data ,
          interviewers: interviewers.data }))
    
        })
    }
    
    useEffect(()=>{
        load();
    },[])

    const setDay = day => setState({ ...state, day });

    function bookInterview(id, interview) {
        return new Promise((resove, reject) => {
        
        const url =`http://localhost:8001/api/appointments/`+id
        axios.put(url,{
            interview
          }).then(res => {  
            const appointment = {
              ...state.appointments[id],
              interview: { ...interview }
            };
          
            const appointments = {
              ...state.appointments,
              [id]: appointment
            }; 
            setState(prev => ({...prev,   appointments }));
            load();
            resove();  
          })
          .catch(error => reject(error))
          
    })};
    
    function cancelInterview (id) {
        return new Promise((resove, reject) => {
      
        const url =`http://localhost:8001/api/appointments/`+id
    
        axios.delete(url)
        .then(res => {
          load();
          resove()})
        .catch(error => reject(error));
      });
    }

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview
    }
}
  