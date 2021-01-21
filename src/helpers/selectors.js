
function getAppointmentsForDay(state, day) {
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

export { getAppointmentsForDay };