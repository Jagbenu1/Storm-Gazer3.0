import Background from '../Background';

const StormGazer = () => {
  return (
    <Background icon={'13d'} imageIndex={Math.round(Math.random() * 4)}>
      <p>Test</p>
    </Background>
  );
};

export default StormGazer;
