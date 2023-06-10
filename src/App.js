import "./style.css";

import BasicGraph from "./graph/basicGraph/basicGraph";
import * as constants from './constants';
import DashBoard from "./pages/dashboard/Dashboard"
import { KawayContext } from "./kawayContext";


import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {	

	const [duration, setDuration] = useState("");
	const [durChangedFlag, setDurChangedFlag] = useState(false);
	const [allAvlblSecs, setAllAvlblSecs] = useState([]);
	const [selectedEx, setSelectedEx] = useState([]);
	const [selectedSecs, setSelectedSecs] = useState([]);


	return (
		<div>
			
			<KawayContext.Provider value={{duration :[ duration, setDuration ],allAvlSec :[ allAvlblSecs, setAllAvlblSecs ],selEx :[ selectedEx, setSelectedEx ],selectedSec :[ selectedSecs, setSelectedSecs ], durChangedFlag:[durChangedFlag, setDurChangedFlag]}}>
				<DashBoard/>
			</KawayContext.Provider>
		</div>
		
	);
}