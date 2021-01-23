
const getAppointmentsForDay = (state, day) => {
    let appointmentsIds=[];
    let appointmentsObjects=[];

    state.days.map( item => {
     if(day === item.name){
         appointmentsIds = [...item.appointments];
     }
     return appointmentsIds ;
    });

    for( let id of appointmentsIds) {
        appointmentsObjects.push(state.appointments[id])
    }

    return  appointmentsObjects;
} 

const getInterview = (state, interview) => {
    
    if(interview === null || state === null || interview.interviewer === null ||
         state.interviewers[interview.interviewer] === null) {
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

const getInterviewersForDay = (state, day) => {
    let interviewersIds=[];
    let interviewersObjects=[];

    state.days.map( item => {
     if(day === item.name){
        interviewersIds = [...item.interviewers];
     }
     return interviewersIds;
    });

    for( let id of interviewersIds) {
        interviewersObjects.push(state.interviewers[id])
    }

    return  interviewersObjects;
} 

export  { getAppointmentsForDay , getInterview , getInterviewersForDay };