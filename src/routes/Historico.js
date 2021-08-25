import Top from "../components/Top";
import Bottom from "../components/Bottom";
import { Holder, History, HabitsHistory } from "../styles/HistoryStyles";

export default function Historico() {
  return (
    <Holder>
      <Top />
      <History>
        <h1>Histórico</h1>
      </History>
      <HabitsHistory>
        <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
      </HabitsHistory>
      <Bottom />
    </Holder>
  );
};