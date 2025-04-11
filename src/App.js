import "./style.css";

import DashBoard from "./pages/dashboard/Dashboard"
import { KawayContext } from "./kawayContext";
import { initializeApp } from 'firebase/app';
import ReactGA from 'react-gtm-module';

import React, { useEffect, useRef,useState } from 'react';

export default function App(props) {	

	const [duration, setDuration] = useState(365);
	const [durChangedFlag, setDurChangedFlag] = useState(false);
	const [allAvlblSecs, setAllAvlblSecs] = useState([]);
	const [selectedEx, setSelectedEx] = useState([]);
	const [selectedSecs, setSelectedSecs] = useState([]);
	const [candleChart, setCandleChart] = useState(false);
	const [apiCallData, setApiCallData] = useState(new Map());
	const [profileData, setProfileData] = useState({loggedIn:false,userData:{}});

	const [selectedFilter, setSelectedFilter] = useState('ALL');

	const firebaseConfig = {
		apiKey: "AIzaSyCWmHX5ohUlbtiAZncTTXxMCv18zUjtVrU",
		authDomain: "bullcharts.org",
		projectId: "kaway-395713",
		storageBucket: "kaway-395713.appspot.com",
		messagingSenderId: "72334033928",
		appId: "1:72334033928:web:0d4548d698d946ad643dbd",
		measurementId: "G-FB3G9DS4EH"
	  };

	const app = initializeApp(firebaseConfig);

	const gAdTagManagerArgs = {
		gtmId: 'G-RF1SSSVF55', 
	  };

	ReactGA.initialize(gAdTagManagerArgs);  

	const gAnalyticManagerArgs = {
		gtmId: 'G-XH0MYEMXY3', 
	  };

	ReactGA.initialize(gAnalyticManagerArgs);    

	return (
		<div>
			
			<KawayContext.Provider value={{duration :[ duration, setDuration ],
											allAvlSec :[ allAvlblSecs, setAllAvlblSecs ],
											selEx :[ selectedEx, setSelectedEx ],
											selectedSec :[ selectedSecs, setSelectedSecs ], 
											durChangedFlag:[durChangedFlag, setDurChangedFlag], 
											candleChart:[candleChart, setCandleChart],
											apiData : [apiCallData, setApiCallData],
											usrProf : [profileData, setProfileData] ,
											selectedFilter : [selectedFilter, setSelectedFilter] }}>
				<DashBoard/>
			</KawayContext.Provider>
		</div>
		
	);
}