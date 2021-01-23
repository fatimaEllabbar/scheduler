import React, { useState , useEffect } from "react";

import DayList from "./DayList"
import Appointment from "./Appointment"
import "components/Application.scss";

import { getAppointmentsForDay , getInterview , getInterviewersForDay} from "helpers/selectors";


const axios=require('axios');



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(()=>{
    
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: days.data,  appointments:  appointments.data ,
      interviewers: interviewers.data }))

    })
  },[])

  console.log(state);


 
const setDay = day => setState({ ...state, day });


const dailyAppointments = getAppointmentsForDay(state, state.day);
const dailyInterviewers = getInterviewersForDay(state, state.day);
console.log(dailyInterviewers)

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
 
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const url =`http://localhost:8001/api/appointments/`+id
  axios.put(url,{
      interview
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });

  setState(prev => ({...prev,   appointments }));

   
}

function cancelInterview (id) {

  console.log("delete "+id)
  let newAppointments = state.appointments;
  newAppointments[id].interview = null ;

  const url =`http://localhost:8001/api/appointments/`+id

  axios.delete(url).then(res => console.log(res));

  setState(prev => ({...prev,   newAppointments }));
 
}

  return (
    <main className="layout">
      <section className="sidebar">
         <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment  
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers = {dailyInterviewers }
            bookInterview = {bookInterview}
            cancelInterview = {cancelInterview}

            />
          )
        }) }
      </section>
      
     
    </main>
  );
}
