import "./style.css";

import DashBoard from "./pages/dashboard/Dashboard"
import { KawayContext } from "./kawayContext";


import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {	

	const [duration, setDuration] = useState("");
	const [durChangedFlag, setDurChangedFlag] = useState(false);
	const [allAvlblSecs, setAllAvlblSecs] = useState([]);
	const [selectedEx, setSelectedEx] = useState([]);
	const [selectedSecs, setSelectedSecs] = useState([]);
	const [candleChart, setCandleChart] = useState(false);


	return (
		<div>
			
			<KawayContext.Provider value={{duration :[ duration, setDuration ],allAvlSec :[ allAvlblSecs, setAllAvlblSecs ],selEx :[ selectedEx, setSelectedEx ],selectedSec :[ selectedSecs, setSelectedSecs ], durChangedFlag:[durChangedFlag, setDurChangedFlag], candleChart:[candleChart, setCandleChart] }}>
				<DashBoard/>
			</KawayContext.Provider>
		</div>
		
	);
}