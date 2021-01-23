import React from "react";



import Show from "./Show";
import Confirm from "./Confirm";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "../hooks/useVisualMode";

import "./styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";



export default function Appointment(props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );


    function save(name, interviewer) {

        const interview = {
          student: name,
          interviewer
        };

       transition(SAVING);

       props.bookInterview(props.id, interview);
     
       transition(SHOW);
    }

    function deleteApp(id) {

        transition(DELETING);
        props.cancelInterview(props.id);
        transition(EMPTY);

    }
    function update(name, interviewer) {
        console.log(interviewer)
        const interview = {
            student: name,
            interviewer
          };
  
        transition(SAVING);
  
        props.updateInterview(props.id, interview);
       
        transition(SHOW);

    }

    return (
        <article className="appointment">
            <Header time = {props.time} />
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                        onDelete = {() => transition(CONFIRM)}
                        onEdit={() => transition(EDIT)}
                    />
                )}
                {mode === CREATE && <Form
                                         interviewers = {props.interviewers}
                                         onSave={save}
                                         onCancel={() => transition(EMPTY)}
                                    />
                }
                {mode === SAVING &&  <Status message={"Saving"} /> }
                {mode === DELETING &&  <Status message={"Deleting"} /> }
                {mode === CONFIRM &&  <Confirm 
                                        message={"Delete the appointment?"}
                                        onConfirm={deleteApp}
                                        onCancel={() => back()} />
                }
                {mode === EDIT && <Form
                                          name={props.interview.student}
                                          interviewers={props.interviewers}
                                          interviewer={props.interview.interviewer.id}
                                          onSave= {update}
                                          onCancel={() => back()}
                                    />
                }
        </article>
    );

}