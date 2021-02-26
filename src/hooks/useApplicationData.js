import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (day, days, appointments) => {
    // find the day object
    const dayObj = days.find((item) => item.name === day);
    // iterate its appointments array
    const appointmentIds = dayObj.appointments;

    let spots = 0;
    for (const id of appointmentIds) {
      const appointment = appointments[id];
      // if interview is null, spots ++
      if (!appointment.interview) {
        spots++;
      }
    }
    // update the spots in the days obj
    dayObj.spots = spots;

    const newDays = [...days];
    return newDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;
    return axios.delete(url).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
