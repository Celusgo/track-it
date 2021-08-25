import { TrashOutline } from "react-ionicons";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Top from "../components/Top";
import Bottom from "../components/Bottom";
import Loader from "react-loader-spinner";
import axios from "axios";
import {
    Holder,
    MyHabits,
    Button,
    CreateHabitHolder,
    HabitInput,
    WeekdayHolder,
    Weekday,
    ButtonsHolder,
    SaveButton,
    CancelButton,
    InitialMessage,
    DoHabit,
    DoHabitName,
    TrashHolder,
  } from "../styles/HabitsStyles";

export default function Habitos() {
  const { user } = useContext(UserContext);
  const [habitName, setHabitName] = useState("");
  const [createHabit, setCreateHabit] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [weekday, setWeekday] = useState([
    { weekday: "D", id: 0, highlight: false },
    { weekday: "S", id: 1, highlight: false },
    { weekday: "T", id: 2, highlight: false },
    { weekday: "Q", id: 3, highlight: false },
    { weekday: "Q", id: 4, highlight: false },
    { weekday: "S", id: 5, highlight: false },
    { weekday: "S", id: 6, highlight: false },
  ]);
  const [myHabits, setMyHabits] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );

    request.then((response) => {
      setMyHabits(response.data);
    });

    request.catch(() => alert("Ocorreu um erro, tente novamente!"));
  }, [user.token]);

  function toggleDay(each) {
    if (each.highlight === true) {
      each.highlight = false;
      setWeekday([...weekday]);
    } else if (each.highlight === false) {
      each.highlight = true;
      setWeekday([...weekday]);
    }
  }

  function updateHabits() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );

    request.then((response) => {
      setMyHabits(response.data);
    });

    request.catch(() => alert("Ocorreu um erro, tente novamente!"));
  }

  function deleteHabit(m) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const confirmDeletion = window.confirm(
      "Tem certeza que quer apagar este hábito?"
    );
    if (confirmDeletion) {
      const deleteSelected = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${m}`,
        config
      );
      deleteSelected.then(updateHabits);
    }
  }

  return (
    <Holder>
      <Top />
      <MyHabits>
        <h1>Meus hábitos</h1>
        <Button onClick={() => setCreateHabit(!createHabit)}>+</Button>
      </MyHabits>

      <CreateHabitHolder show={createHabit}>
        <HabitInput
          type="text"
          disabled={isEnabled}
          value={habitName}
          placeholder="nome do hábito"
          onChange={(e) => setHabitName(e.target.value)}
        />

        <WeekdayHolder>
          {weekday.map((each, i) => (
            <Weekday
              key={i}
              disabled={isEnabled}
              clicked={each.highlight}
              onClick={() => toggleDay(each)}
            >
              {each.weekday}
            </Weekday>
          ))}
        </WeekdayHolder>

        <ButtonsHolder>
          <CancelButton
            disabled={isEnabled}
            onClick={() => setCreateHabit(false)}
          >
            Cancelar
          </CancelButton>
          <SaveButton
            disabled={isEnabled}
            opacityWhenDisabled={isEnabled}
            onClick={() => {
              setIsEnabled(true);
              const config = {
                headers: { Authorization: `Bearer ${user.token}` },
              };
              const body = {
                name: habitName,
                days: weekday
                  .filter((each) => each.highlight === true)
                  .map((each) => each.id),
              };
              const send = axios.post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                body,
                config
              );
              send.then((response) => {
                setIsEnabled(false);
                setHabitName("");
                setCreateHabit(false);
                setWeekday([
                  { weekday: "D", id: 0, highlight: false },
                  { weekday: "S", id: 1, highlight: false },
                  { weekday: "T", id: 2, highlight: false },
                  { weekday: "Q", id: 3, highlight: false },
                  { weekday: "Q", id: 4, highlight: false },
                  { weekday: "S", id: 5, highlight: false },
                  { weekday: "S", id: 6, highlight: false },
                ]);
                setMyHabits([...myHabits, response.data]);
              });
              send.catch(() => {
                alert("Ocorreu um erro, tente novamente!");
                setIsEnabled(false);
              });
            }}
          >
            {isEnabled ? (
              <Loader type="ThreeDots" color="#FFFFFF" height={40} width={40} />
            ) : (
              "Salvar"
            )}
          </SaveButton>
        </ButtonsHolder>
      </CreateHabitHolder>

      <InitialMessage show={myHabits.length === 0 ? true : false}>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </InitialMessage>
      {myHabits
        .map((m, i) => (
          <DoHabit key={i}>
            <TrashHolder>
              <TrashOutline onClick={() => deleteHabit(m.id)} />
            </TrashHolder>
            <DoHabitName>{m.name}</DoHabitName>
            <WeekdayHolder>
              {weekday.map((each, i) => (
                <Weekday
                  key={i}
                  className={m.days.includes(i) ? "selected" : ""}
                >
                  {each.weekday}
                </Weekday>
              ))}
            </WeekdayHolder>
          </DoHabit>
        ))
        .reverse()}

      <Bottom />
    </Holder>
  );
};