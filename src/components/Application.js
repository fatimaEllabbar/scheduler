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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
