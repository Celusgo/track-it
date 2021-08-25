import { CheckmarkOutline } from "react-ionicons";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import ProgressWheelContext from "../contexts/ProgressWheelContext";
import Top from "../components/Top";
import Bottom from "../components/Bottom";
import "dayjs/locale/pt";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
import axios from "axios";
import {
  Holder,
  WeekDayName,
  HabitInformation,
  HabitsHolder,
  HabitTracking,
  Now,
  Record,
  CheckmarkHolder,
} from "../styles/TodayStyles";

export default function Hoje() {
  dayjs.extend(calendar);

  const [todayHabits, setTodayHabits] = useState([]);
  const { user } = useContext(UserContext);
  const { progressWheel, setProgressWheel } = useContext(ProgressWheelContext);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    request.then((response) => {
      setTodayHabits(response.data);
      setProgressWheel(
        response.data.reduce((acc, item) => (item.done ? acc + 1 : acc), 0) /
          response.data.length
      );
    });
    request.catch(() => alert("Ocorreu um erro, tente novamente!"));
  }, [user.token, setProgressWheel]);

  function updateToday() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    request.then((response) => {
      setTodayHabits(response.data);
      setProgressWheel(
        response.data.reduce((acc, item) => (item.done ? acc + 1 : acc), 0) /
          response.data.length
      );
    });

    request.catch(() => alert("Ocorreu um erro, tente novamente!"));
  }

  function manageHabits(done, id) {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    if (done === false) {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        {},
        config
      );
      request.then(updateToday);
    } else if (done === true) {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        {},
        config
      );
      request.then(updateToday);
    }
  }

  return (
    <Holder>
      <Top />
      <WeekDayName>
        <h1>
          {dayjs().locale("pt").format("dddd").replace("-feira", "")},{" "}
          {dayjs().calendar(dayjs("2019-09-21"), { sameElse: "DD/MM" })}
        </h1>
      </WeekDayName>
      <HabitInformation green={progressWheel > 0}>{`${
        isNaN(progressWheel)
          ? "Nenhum hábito concluído ainda"
          : Math.round(progressWheel * 100) + "% dos hábitos concluídos hoje"
      }`}</HabitInformation>
      {todayHabits.map((each, i) => (
        <HabitsHolder key={i}>
          <HabitTracking>
            <h1>{each.name}</h1>
            <Now selected={each.done}>
              Sequência atual: <p>{each.currentSequence} dia(s)</p>
            </Now>
            <Record
              selected={
                each.currentSequence === each.highestSequence &&
                each.highestSequence !== 0
              }
            >
              Seu recorde: <p>{each.highestSequence} dia(s)</p>
            </Record>
          </HabitTracking>
          <CheckmarkHolder
            selected={each.done}
            onClick={() => manageHabits(each.done, each.id)}
          >
            <CheckmarkOutline color={"#FFFFFF"} height="60px" width="60px" />
          </CheckmarkHolder>
        </HabitsHolder>
      ))}
      <Bottom />
    </Holder>
  );
};
