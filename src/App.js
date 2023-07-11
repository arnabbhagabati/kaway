import "./style.css";

import DashBoard from "./pages/dashboard/Dashboard"
import { KawayContext } from "./kawayContext";
import { initializeApp } from 'firebase/app';


import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {	

	const [duration, setDuration] = useState("");
	const [durChangedFlag, setDurChangedFlag] = useState(false);
	const [allAvlblSecs, setAllAvlblSecs] = useState([]);
	const [selectedEx, setSelectedEx] = useState([]);
	const [selectedSecs, setSelectedSecs] = useState([]);
	const [candleChart, setCandleChart] = useState(false);
	const [apiCallData, setApiCallData] = useState(new Map());
	const [profileData, setProfileData] = useState({loggedIn:false,userData:null});

	const firebaseConfig = {
		apiKey: "AIzaSyC81NoOiG1Ad5gz7MINsfZGiAokIH5K-zk",
		authDomain: "silly-tomato-386917.firebaseapp.com",
		projectId: "silly-tomato-386917",
		storageBucket: "silly-tomato-386917.appspot.com",
		messagingSenderId: "961131906413",
		appId: "1:961131906413:web:7f729975010c49bad90664",
		measurementId: "G-XH0MYEMXY3"
	  };

	const app = initializeApp(firebaseConfig);

	return (
		<div>
			
			<KawayContext.Provider value={{duration :[ duration, setDuration ],
											allAvlSec :[ allAvlblSecs, setAllAvlblSecs ],
											selEx :[ selectedEx, setSelectedEx ],
											selectedSec :[ selectedSecs, setSelectedSecs ], 
											durChangedFlag:[durChangedFlag, setDurChangedFlag], 
											candleChart:[candleChart, setCandleChart],
											apiData : [apiCallData, setApiCallData],
											usrProf : [profileData, setProfileData] }}>
				<DashBoard/>
			</KawayContext.Provider>
		</div>
		
	);
}