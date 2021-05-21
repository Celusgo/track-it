import styled from 'styled-components';
import { CheckmarkOutline } from 'react-ionicons';
import React, {useContext, useEffect} from 'react';
import UserContext from './contexts/UserContext';
import Top from './Top';
import Bottom from './Bottom';
import "dayjs/locale/pt";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
import axios from 'axios';

export default function Hoje(){
    const [todayHabits, setTodayHabits] = React.useState([]);
    const {user} = useContext(UserContext);

    dayjs.extend(calendar);

    useEffect(() => {
        const config = {
            headers: {"Authorization": `Bearer ${user.token}`}
        }
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

		request.then(response => {
			setTodayHabits(response.data);
		});
        request.catch(() => alert("Ocorreu um erro, tente novamente!"))
	}, [user.token]);

    return(
        <Holder>
            <Top/>
             <WeekDayName><h1>{dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}</h1></WeekDayName>
             <HabitInformation>Nenhum hábito concluido ainda</HabitInformation>
             {todayHabits.map((t, i) => 
                <HabitsHolder key = {i}>
                    <Task>
                        <h1>{t.name}</h1>
                        <p>Sequência atual: <Days state = {t.done}>{t.currentSequence} dias</Days></p>
                        <p>Seu recorde: <Days state = {t.currentSequence === t.highestSequence}>{t.highestSequence} dias</Days></p>
                    </Task>
                    <Checkmark>
                        <CheckmarkOutline
                        color={'#fff'} 
                        height="60px"
                        width="60px"
                        />
                    </Checkmark>
                </HabitsHolder>)}
            <Bottom/>
        </Holder>
    )
}

const Holder = styled.div`
    box-sizing:border-box;
    background-color:#e5e5e5;
    min-height:100vh;
    width:100%;
    padding-top:70px;
    padding-right:20px;
    padding-left:20px;
    padding-bottom:120px;
`;

const WeekDayName = styled.div`
    margin-top: 28px;
    h1{
        font-family:'Lexend Deca';
        font-size:23px;
        color:#126ba5;
    }
`;

const HabitInformation = styled.div`
    margin-top:2px;
    font-family:'Lexend Deca';
    font-size:18px;
    color:#BABABA;
`;

const HabitsHolder = styled.div`
    display:flex;
    justify-content: space-between;
    box-sizing:border-box;
    padding:14px;
    height:94px;
    width:340px;
    border-radius:5px;
    background-color:#FFFFFF;
    margin-top:10px;
`

const Task = styled.div`
        font-family: 'Lexend Deca', sans-serif;
    h1{
        color: #666;
        margin-bottom: 7px;
        font-size: 20px;
    }
    span, p{
        font-size: 13px;
        margin-bottom: 5px;
    }
    p{
        color: #666;
    }
`;

const Days = styled.span`
        color: ${props => props.state? "#8FC549": "#666"};
`;

const Checkmark = styled.div`
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.state? "#8FC549": "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`;