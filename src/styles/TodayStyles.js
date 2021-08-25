import styled from "styled-components";

export const Holder = styled.div`
    box-sizing:border-box;
    background-color:#e5e5e5;
    min-height:100vh;
    width:100%;
    padding-top:70px;
    padding-right:20px;
    padding-left:20px;
    padding-bottom:120px;
`;

export const WeekDayName = styled.div`
    margin-top: 28px;

    h1{
        font-family:'Lexend Deca';
        font-size:23px;
        color:#126ba5;
    }
`;

export const HabitInformation = styled.div`
    margin-top:2px;
    font-family:'Lexend Deca';
    font-size:18px;
    color: ${props => props.green? "#8FC549": "#BABABA"};
`;

export const HabitsHolder = styled.div`
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

export const HabitTracking = styled.div`
    h1{
        font-family: 'Lexend Deca';
        color: #666666;
        margin-bottom: 7px;
        font-size: 20px;
    }
`;

export const Now = styled.div`
    display:flex;
    font-family:'Lexend Deca';
    font-size:13px;
    color:#666666;
    p{
        margin-left:3px;
        color: ${props => props.selected? "#8FC549": "#666666"};
    }
`;

export const Record = styled.div`
    display:flex;
    font-family:'Lexend Deca';
    font-size:13px;
    color:#666666;
    p{
        margin-left:3px;
        color: ${props => props.selected? "#8FC549": "#666666"};
    }
`;

export const CheckmarkHolder = styled.div`
    display: flex;
    width: 69px;
    height: 69px;
    justify-content: center;
    align-items: center;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-color: ${props => props.selected? "#8FC549": "#EBEBEB"};
`;