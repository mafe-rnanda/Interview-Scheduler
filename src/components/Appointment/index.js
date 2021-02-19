import React from "react";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
        name={""}
        interviewers={props.interviewers}
        interviewer={{}}
        onSave={() => console.log("onSave")}
        onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => console.log("onEdit")}
          onDelete={() => console.log("onDelete")}
        />
      )}
    </article>
  );
}
