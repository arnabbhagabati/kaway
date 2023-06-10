import React, { useState } from 'react';
import styled from 'styled-components';
import * as constants from '../../constants';
import styles from './multi-btn.css'

const Button = styled.button`
  /* Same as above */
`;
const ButtonToggle = styled(Button)`
  opacity: 0.4;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `};
  border:none;
  color:black;
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['1W', '2W', '1M' ,'6M','1Y','5Y','All'];

export default function ToggleGroup(props) {
  console.log('props.graphDuration in mult is '+JSON.stringify(props));
  const [active, setActive] = useState(types[0]);

  const setDur = (type) => {
    setActive(type);
    switch(type){
      case '1W':
        props.setGraphDur(7);
        break;
      case '2W':
        props.setGraphDur(14);
        break;
      case '1M':
        props.setGraphDur(30);
        break;
      case '6M':
        props.setGraphDur(180);
        break;
      case '1Y':
        props.setGraphDur(365);
        break;
      case '5Y':
        props.setGraphDur(1825);
        break;
      case 'All':
        props.setGraphDur(9999999);
        break;          
    }
 }


  return (
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle 
          key={type}
          active={active === type}
          onClick={() => setDur(type)}
          className="button-style"
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}