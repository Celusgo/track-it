import styled from "styled-components";

export const Holder = styled.div`
  box-sizing: border-box;
  background-color: #e5e5e5;
  min-height: 100vh;
  width: 100%;
  padding-top: 70px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 120px;
`;

export const MyHabits = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: "Lexend Deca";
    font-size: 23px;
    color: #126ba5;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 40px;
  height: 35px;
  background-color: #52b6ff;
  border-radius: 4.63636px;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 27px;
  font-family: "Lexend Deca";
  text-align: center;
  justify-content: center;
`;

export const CreateHabitHolder = styled.div`
  box-sizing: border-box;
  height: 180px;
  width: 340px;
  padding: 9px;
  margin-top: 22px;
  background-color: #ffffff;
  border-radius: 5px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export const HabitInput = styled.input`
  height: 45px;
  width: 303px;
  padding-left: 11px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  outline: none;
  color: #666666;
  ::-webkit-input-placeholder {
    color: #dbdbdb;
  }
`;

export const WeekdayHolder = styled.div`
  height: 30px;
  display: flex;
  margin-top: 10px;
`;

export const Weekday = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  margin-right: 4px;
  justify-content: center;
  align-items: center;
  font-family: "Lexend Deca";
  font-size: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  color: ${(props) => (props.clicked ? "#FFFFFF" : "#DBDBDB")};
  outline: none;
  background-color: ${(props) => (props.clicked ? "#DBDBDB" : "#FFFFFF")};
  &.selected {
    background-color: #cfcfcf;
    color: #ffffff;
  }
`;

export const ButtonsHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 30px;
  height: 35px;
  width: 303px;
`;

export const SaveButton = styled.button`
  width: 84px;
  height: 35px;
  background-color: #52b6ff;
  font-family: "Lexend Deca";
  font-size: 16px;
  color: #ffffff;
  border: none;
  border-radius: 4.63636px;
  outline: none;
  opacity: ${(props) => (props.opacityWhenDisabled ? "0.7" : "1")};
`;

export const CancelButton = styled.button`
  width: 84px;
  height: 35px;
  background-color: #ffffff;
  font-family: "Lexend Deca";
  font-size: 16px;
  color: #52b6ff;
  border: none;
  border-radius: 4.63636px;
  margin-left: 175px;
  outline: none;
`;

export const InitialMessage = styled.div`
  width: 338px;
  height: 74px;
  font-family: "Lexend Deca";
  font-size: 18px;
  color: #666666;
  margin-top: 30px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export const DoHabit = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 14px;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 91px;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 10px;
`;

export const DoHabitName = styled.div`
  font-family: "Lexend Deca";
  font-size: 20px;
  color: #666666;
`;

export const TrashHolder = styled.div`
  width: 13px;
  height: 15px;
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 20px;
  margin-top: 15px;
`;