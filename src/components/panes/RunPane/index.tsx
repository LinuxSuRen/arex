import RunResultPane from './RunResult';

const RunPane = ({ pane }: any) => {
  // console.log(pane)
  const rawId = 'planId1';
  return (
    <div>
      {/*{rawId === 'planId' && <RunCreatePane />}*/}
      {<RunResultPane />}
    </div>
  );
};

export default RunPane;
