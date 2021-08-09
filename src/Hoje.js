import styled from 'styled-components';
import { CheckmarkOutline } from 'react-ionicons';
import React, {useContext, useEffect} from 'react';
import UserContext from './contexts/UserContext';
import ProgressWheelContext from './contexts/ProgressWheelContext';
import Top from './Top';
import Bottom from './Bottom';
import "dayjs/locale/pt";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
import axios from 'axios';

export default function Hoje(){
    dayjs.extend(calendar);

    const [todayHabits, setTodayHabits] = React.useState([]);
    const {user} = useContext(UserContext);
    const { progressWheel, setProgressWheel } = useContext(ProgressWheelContext);

    useEffect(() => {
        const config = {
            headers: {"Authorization": `Bearer ${user.token}`}
        }
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

		request.then(response => {
			setTodayHabits(response.data);
            setProgressWheel(response.data.reduce((acc, item) => (item.done? acc + 1 : acc), 0)/response.data.length);
		});
        request.catch(() => alert("Ocorreu um erro, tente novamente!"))
	}, [user.token, setProgressWheel]);

    function updateToday(){
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        
        request.then(response => {
            setTodayHabits(response.data);
            setProgressWheel(response.data.reduce((acc, item) => (item.done? acc + 1 : acc), 0)/response.data.length);
        });

        request.catch(() => alert("Ocorreu um erro, tente novamente!"));
    }

    function manageHabits (done, id){
        const config = {
            headers: {"Authorization": `Bearer ${user.token}`}
        }

        if(done === false){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
            request.then(updateToday);
           
        }
        else if(done === true){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
            request.then(updateToday);
           
        }
    }
    
  

    return(
        <Holder>
            <Top/>
             <WeekDayName><h1>{dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}</h1></WeekDayName>
             <HabitInformation green = {progressWheel > 0}>{`${isNaN(progressWheel)?'Nenhum hábito concluído ainda':Math.round(progressWheel*100) + '% dos hábitos concluídos hoje'}`}</HabitInformation>
             {todayHabits.map((each, i) => 
                <HabitsHolder key = {i}>
                    <HabitTracking>
                        <h1>{each.name}</h1>
                        <Now selected = {each.done}>Sequência atual: <p>{each.currentSequence} dia(s)</p></Now>
                        <Record selected = {each.currentSequence === each.highestSequence && each.highestSequence !== 0}>Seu recorde: <p>{each.highestSequence} dia(s)</p></Record>
                    </HabitTracking>
                    <CheckmarkHolder selected = {each.done} onClick={() => manageHabits(each.done, each.id)}>
                        <CheckmarkOutline color={'#FFFFFF'}  height="60px" width="60px"/>
                    </CheckmarkHolder>
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
    color: ${props => props.green? "#8FC549": "#BABABA"};
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
`;

const HabitTracking = styled.div`
    h1{
        font-family: 'Lexend Deca';
        color: #666666;
        margin-bottom: 7px;
        font-size: 20px;
    }
`;

const Now = styled.div`
    display:flex;
    font-family:'Lexend Deca';
    font-size:13px;
    color:#666666;
    p{
        margin-left:3px;
        color: ${props => props.selected? "#8FC549": "#666666"};
    }
`;

const Record = styled.div`
    display:flex;
    font-family:'Lexend Deca';
    font-size:13px;
    color:#666666;
    p{
        margin-left:3px;
        color: ${props => props.selected? "#8FC549": "#666666"};
    }
`;

const CheckmarkHolder = styled.div`
    display: flex;
    width: 69px;
    height: 69px;
    justify-content: center;
    align-items: center;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-color: ${props => props.selected? "#8FC549": "#EBEBEB"};
`;