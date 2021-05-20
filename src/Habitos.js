import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';
import Top from './Top';
import Bottom from './Bottom';
import Loader from "react-loader-spinner";

export default function Habitos(){
    const {user} = useContext(UserContext);
    const [habitName, setHabitName] = React.useState("");
    const [createHabit, setCreateHabit] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [weekday, setWeekday ]= React.useState([
        {weekday: "D", id: 1, highlight: false},
        {weekday: "S", id: 2, highlight: false},
        {weekday: "T", id: 3, highlight: false}, 
        {weekday: "Q", id: 4, highlight: false},
        {weekday: "Q", id: 5, highlight: false},
        {weekday: "S", id: 6, highlight: false},
        {weekday: "S", id: 7, highlight: false}
    ])
    
    //const config = {
        //headers: {"Authorization": `Bearer ${user.token}`}
    //}
    function toggleDay(each){
        each.highlight = !(each.highlight);
        setWeekday([...weekday]);
        console.log(weekday);
    }
    

    return(
        <Holder>
            <Top/>
            <MyHabits>
                <h1>Meus hábitos</h1>
                <Button onClick={() => setCreateHabit(!createHabit)}>+</Button>
            </MyHabits>

            <CreateHabitHolder show = {createHabit}>
                <HabitInput type="text" disabled={isEnabled} placeholder="nome do hábito" onChange={e => setHabitName(e.target.value)}></HabitInput>
                <WeekdayHolder>
                    {weekday.map((each,i)=><Weekday key = {i} disabled = {isEnabled} clicked = {each.highlight} onClick = {()=>toggleDay(each)}>
                        {each.weekday}
                    </Weekday>)}
                </WeekdayHolder>
                <ButtonsHolder>
                    <CancelButton disabled = {isEnabled} onClick = {()=>setCreateHabit(false)}>Cancelar</CancelButton>
                    <SaveButton disabled = {isEnabled} opacity = {isEnabled} onClick = {()=>setIsEnabled(true)}>{isEnabled?<Loader type="ThreeDots" color="#FFFFFF" height={40} width={40}/>:"Salvar"}</SaveButton>
                </ButtonsHolder>

            </CreateHabitHolder>

            <Bottom/>
        </Holder>
    )
}

const Holder = styled.div`
    box-sizing:border-box;
    background-color:#e5e5e5;
    height:100vh;
    width:100%;
    padding-top:70px;
    padding-right:20px;
    padding-left:20px;
`;


const MyHabits = styled.div`
    box-sizing: border-box;
    width:100%;
    margin-top:22px;
    display:flex;
    align-items: center;
    justify-content: space-between;

    h1{
        font-family:'Lexend Deca';
        font-size:23px;
        color:#126BA5;
    }
`;

const Button = styled.button`
    display:flex;
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    border:none;
    outline:none;
    color:#FFFFFF;
    font-size:27px;
    font-family:'Lexend Deca';
    justify-content: center;
    align-items: center;
`;

const CreateHabitHolder = styled.div`
    box-sizing:border-box;
    padding:18px;
    margin-top:22px;
    background-color:#ffffff;
    border-radius: 5px;
    display: ${props => props.show? "block":"none"};
`

const HabitInput = styled.input`
    height:45px;
    width:303px;
    padding-left:11px;
    border:1px solid #d4d4d4;
    border-radius:5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    outline:none;
    color: #666666;
    ::-webkit-input-placeholder  { 
        color: #DBDBDB; 
    }
`;

const WeekdayHolder = styled.div`
    height:30px;
    display:flex;
    margin-top:10px;
`;

const Weekday = styled.button`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-size: 20px;
    color: ${props => props.clicked? "#fff": "#DBDBDB"};
    background-color: ${props => props.clicked? "#DBDBDB": "#fff"};
`;

const ButtonsHolder = styled.div`
    display:flex;
    align-items: center;
    justify-content: right;
    margin-top:30px;
    height:35px;
    width:303px;
`

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background-color:#52b6ff;
    font-family:'Lexend Deca';
    font-size:16px;
    color:#FFFFFF;
    border:none;
    border-radius: 4.63636px;
    outline:none;
    opacity: ${props => props.opacity? "0.7": "1"};
`

const CancelButton = styled.button`
    width: 84px;
    height: 35px;
    background-color:#FFFFFF;
    font-family:'Lexend Deca';
    font-size:16px;
    color:#52b6ff;
    border:none;
    border-radius: 4.63636px;
    margin-left:175px;
    outline:none;
`