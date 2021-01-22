
const getAppointmentsForDay = (state, day) => {
    let appointmentsIds=[];
    let appointmentsObjects=[];

    state.days.map( item => {
     if(day === item.name){
         appointmentsIds = [...item.appointments];
     }
    });

    for( let id of appointmentsIds) {
        appointmentsObjects.push(state.appointments[id])
    }

    return  appointmentsObjects;
} 

const getInterview = (state, interview) => {
    
    if(interview === null ) {
        return null;
    } else {

       return {
                student: interview.student,
                interviewer: {
                id: interview.interviewer,
                name: state.interviewers[interview.interviewer].name,
                avatar:  state.interviewers[interview.interviewer].avatar
                }
        }  

   }
}

export  { getAppointmentsForDay , getInterview };