export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.filter(element => element.name === day)[0]; 
  const appointmentsOfDay = [];

  if (!selectedDay) {
    return [];
  } else {
    selectedDay.appointments.map(id => appointmentsOfDay.push(state.appointments[id]))
    return appointmentsOfDay;
  }
}