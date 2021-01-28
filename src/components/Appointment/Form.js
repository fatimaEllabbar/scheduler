import React, { useState } from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList"


export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");
    const [errorInterviewer, setErrorInterviewer] = useState("");

    const reset = () => {
        setName('');
        setInterviewer(null);
    }

    const cancel = () => {
        reset();
        props.onCancel();
    }

    function validate() {
        if (name === "") {
            setError("Student name cannot be blank");
            return;
        }
        setError("");
        if (!interviewer) {
            setErrorInterviewer("An interviewer must be selected");
            return;
        }
        setErrorInterviewer("");
        props.onSave(name, interviewer);
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-testid="student-name-input"
                    />
                </form>
                <section className="appointment__validation">{error}</section>
                <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
                <section className="appointment__validation">{errorInterviewer}</section>
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={() => validate()}>Save</Button>
                </section>
            </section>
        </main>

    );
}