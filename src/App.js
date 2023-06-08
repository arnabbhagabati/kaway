import "./style.css";

import BasicGraph from "./graph/basicGraph/basicGraph";
import * as constants from './constants';
import DashBoard from "./pages/dashboard/Dashboard"
import { KawayContext } from "./kawayContext";


import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {	

	const [kawayText, setKawayText] = useState("");

	const [allAvlblSecs, setAllAvlblSecs] = useState([]);
	const [selectedEx, setSelectedEx] = useState([]);
	const [selectedSecs, setSelectedSecs] = useState([]);


	return (
		<div>
			
			<KawayContext.Provider value={{kawayText :[ kawayText, setKawayText ],allAvlSec :[ allAvlblSecs, setAllAvlblSecs ],selEx :[ selectedEx, setSelectedEx ],selectedSec :[ selectedSecs, setSelectedSecs ]}}>
				<DashBoard/>
			</KawayContext.Provider>
		</div>
		
	);
}