const Location = (props: { city: string; state: string }) => {
  return (
    <p>
      {props.city}, {props.state}
    </p>
  );
};

export default Location;
