export function getAppointmentsForDay(state, day) {
  //returns an array of appointments for that day
  const selectedDay = state.days.filter((element) => element.name === day)[0];
  if (state.days.length === 0 || selectedDay === undefined) {
    return [];
  }
  return selectedDay.appointments.map((id) => state.appointments[id]);
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
  //returns an array of interviewers for that day
  const selectedDay = state.days.filter((element) => element.name === day)[0];
  if (state.days.length === 0 || selectedDay === undefined) {
    return [];
  }
  return selectedDay.interviewers.map((id) => state.interviewers[id]);

}