import HumanGrouperUI from "./HumanGrouperUI";
import AIGrouperUI from "./AIGrouperUI";
import { Alert } from "react-bootstrap";

interface SuperCompProps {
  useAI: number;
  id: number;
  wordList: string[];
  categoryTitles: string[];
  onFinishedCallback: (groupedResults: string[][]) => void;
}

function SuperComp({
  useAI,
  id,
  wordList,
  categoryTitles,
  onFinishedCallback,
}: SuperCompProps) {
  return (
    <>
      {useAI === 1 ? (
        <AIGrouperUI
          wordList={wordList}
          categoryTitles={categoryTitles}
          onFinishedCallback={onFinishedCallback}
        />
      ) : useAI === 0 ? (
        <HumanGrouperUI
          wordList={wordList}
          categoryTitles={categoryTitles}
          onFinishedCallback={onFinishedCallback}
        />
      ) : (
        <Alert> You're all done! Your ID number is {id}</Alert>
      )}
    </>
  );
}

export default SuperComp;
