export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.filter((element) => element.name === day)[0];
  const appointmentsOfDay = [];

  if (!selectedDay) {
    return [];
  } else {
    selectedDay.appointments.map((id) =>
      appointmentsOfDay.push(state.appointments[id])
    );
    return appointmentsOfDay;
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const selectedDay = state.days.filter((element) => element.name === day)[0];
  const interviewersOfDay = [];
  
  if (!selectedDay) {
    return [];
  } else {
    selectedDay.appointments.map((id) => {
      const appointmentInterview = state.appointments[id].interview;
      !(appointmentInterview) ? null : interviewersOfDay.push(state.interviewers[appointmentInterview.interviewer])
    }
    );
    return interviewersOfDay;
  }
}
