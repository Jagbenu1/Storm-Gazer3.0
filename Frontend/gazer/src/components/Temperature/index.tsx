const Temperature = (props: { temp: number }) => {
  return <p>{Math.round(props.temp)}&#8457;</p>;
};

export default Temperature;
