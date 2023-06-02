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
  color:${constants.COLORS.normal_blue || "#BF4F74"};
`;
const ButtonGroup = styled.div`
  display: flex;

`;
const types = ['5D', '1W', '2W', '1M' ,'6M','1Y','5Y','All'];

export default function ToggleGroup() {
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