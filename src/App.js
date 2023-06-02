import "./style.css";

import BasicGraph from "./graph/basicGraph/basicGraph";
import * as constants from './constants';
import TVGraph from "./graph/tvGraph";

import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {
	let secList = constants.STOCK_CODE_LIST;
	console.log("sec list found "+secList);

	return (
		
		<div>
			{secList.map((sec, index) => <BasicGraph exchange={sec.exchange} secId={sec.id} code={sec.code} key={index} />)} 			
		</div>
		
	);
}