export default function PageOptions() {
    const [active, setActive] = useState(types[0]);
    return (
      <ButtonGroup>
        {types.map(type => (
          <ButtonToggle 
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
            className="button-style"
          >
            {type}
          </ButtonToggle>
        ))}
      </ButtonGroup>
    );
  }