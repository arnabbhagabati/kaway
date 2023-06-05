import "./style.css";

import BasicGraph from "./graph/basicGraph/basicGraph";
import * as constants from './constants';
import DashBoard from "./pages/dashboard/Dashboard"

import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {
	let secList = constants.STOCK_CODE_LIST;
	console.log("sec list found "+secList);

	return (
		<DashBoard />
		
	);
}