import styled from 'styled-components';
import { TrashOutline } from 'react-ionicons';
import React, { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import Top from '../components/Top';
import Bottom from '../components/Bottom';
import Loader from "react-loader-spinner";
import axios from 'axios';

export default function Habitos(){
    const {user} = useContext(UserContext);
    const [habitName, setHabitName] = React.useState("");
    const [createHabit, setCreateHabit] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [weekday, setWeekday ]= React.useState([
        {weekday: "D", id: 0, highlight: false},
        {weekday: "S", id: 1, highlight: false},
        {weekday: "T", id: 2, highlight: false}, 
        {weekday: "Q", id: 3, highlight: false},
        {weekday: "Q", id: 4, highlight: false},
        {weekday: "S", id: 5, highlight: false},
        {weekday: "S", id: 6, highlight: false}
    ])
    const [myHabits, setMyHabits] = React.useState([]);
    

    useEffect(() => {
        const config = {
            headers: {"Authorization": `Bearer ${user.token}`}
        }
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

		request.then(response => {
			setMyHabits(response.data);
		});

        request.catch(() => alert("Ocorreu um erro, tente novamente!"));
	}, [user.token]);


    function toggleDay(each){
        if(each.highlight === true){
            each.highlight = false;
            setWeekday([...weekday]);
        } else if(each.highlight === false){
            each.highlight = true
            setWeekday([...weekday]);
        }
    }

    function updateHabits(){
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        
        request.then(response => {
            setMyHabits(response.data);
        });

        request.catch(() => alert("Ocorreu um erro, tente novamente!"));
    }

    function deleteHabit(m){
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
    
        const confirmDeletion = window.confirm("Tem certeza que quer apagar este hábito?");
        if(confirmDeletion){
        const deleteSelected = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${m}`, config);
        deleteSelected.then(updateHabits);   
        }
    }
    

    return(
        <Holder>
            <Top/>
            <MyHabits>
                <h1>Meus hábitos</h1>
                <Button onClick={() => setCreateHabit(!createHabit)}>+</Button>
            </MyHabits>

            <CreateHabitHolder show = {createHabit}>
                <HabitInput type="text" disabled={isEnabled} value = {habitName} placeholder="nome do hábito" onChange={e => setHabitName(e.target.value)}></HabitInput>
                <WeekdayHolder>
                    {weekday.map((each,i)=><Weekday key = {i} disabled = {isEnabled} clicked = {each.highlight} onClick = {()=>toggleDay(each)}>
                        {each.weekday}
                    </Weekday>)}
                </WeekdayHolder>
                <ButtonsHolder>
                    <CancelButton disabled = {isEnabled} onClick = {()=>setCreateHabit(false)}>Cancelar</CancelButton>
                    <SaveButton disabled = {isEnabled} opacityWhenDisabled = {isEnabled} onClick = {()=>{setIsEnabled(true);
                    const config = {
                        headers: {"Authorization": `Bearer ${user.token}`}
                    }
                    const body = {name: habitName,
                        days:weekday.filter((each)=> each.highlight === true).map((each)=>each.id)
                    }
                    const send = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
                    send.then((response)=>{setIsEnabled(false);
                        setHabitName("");
                        setCreateHabit(false);
                        setWeekday([
                            {weekday: "D", id: 0, highlight: false},
                            {weekday: "S", id: 1, highlight: false},
                            {weekday: "T", id: 2, highlight: false}, 
                            {weekday: "Q", id: 3, highlight: false},
                            {weekday: "Q", id: 4, highlight: false},
                            {weekday: "S", id: 5, highlight: false},
                            {weekday: "S", id: 6, highlight: false}
                        ]);
                        setMyHabits([...myHabits, response.data]);
                    })
                    send.catch(()=>{alert("Ocorreu um erro, tente novamente!"); setIsEnabled(false)}); 
                }}>{isEnabled?<Loader type="ThreeDots" color="#FFFFFF" height={40} width={40}/>:"Salvar"}</SaveButton>
                </ButtonsHolder>
            </CreateHabitHolder>
            <InitialMessage show = {myHabits.length === 0?true:false}>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</InitialMessage>
            {myHabits.map((m, i)=>
                <DoHabit key = {i}>
                    <TrashHolder>
                        <TrashOutline onClick = {()=>deleteHabit(m.id)}/>
                    </TrashHolder>
                    <DoHabitName>{m.name}</DoHabitName>
                    <WeekdayHolder>
                        {weekday.map((each, i)=><Weekday key = {i} className = {m.days.includes(i)?"selected":""}>{each.weekday}</Weekday>)}
                    </WeekdayHolder>
                </DoHabit>
            ).reverse()}


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
    height:180px;
    width:340px;
    padding:9px;
    margin-top:22px;
    background-color:#ffffff;
    border-radius: 5px;
    display: ${props => props.show? "block":"none"};
`;

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
    display: flex;
    width: 30px;
    height: 30px;
    margin-right: 4px;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca';
    font-size: 20px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: ${props => props.clicked? "#FFFFFF": "#DBDBDB"};
    outline:none;
    background-color: ${props => props.clicked? "#DBDBDB": "#FFFFFF"};
    &.selected{
        background-color:#cfcfcf;
        color:#FFFFFF;
    }
`;

const ButtonsHolder = styled.div`
    display:flex;
    align-items: center;
    justify-content: right;
    margin-top:30px;
    height:35px;
    width:303px;
`;

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
    opacity: ${props => props.opacityWhenDisabled? "0.7": "1"};
`;

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
`;

const InitialMessage = styled.div`
    width:338px;
    height:74px;
    font-family: 'Lexend Deca';
    font-size:18px;
    color:#666666;
    margin-top:30px;
    display: ${props => props.show? "block":"none"};
`;

const DoHabit = styled.div`
    position:relative;
    box-sizing:border-box;
    padding:14px;
    display:flex;
    flex-direction:column;
    width:340px;
    height:91px;
    border-radius:5px;
    background-color:#FFFFFF;
    margin-top:10px;
`;

const DoHabitName = styled.div`
    font-family: 'Lexend Deca';
    font-size:20px;
    color:#666666;
`;

const TrashHolder = styled.div`
    width:13px;
    height:15px;
    position:absolute;
    right:0;
    top:0;
    margin-right:20px;
    margin-top:15px;
`