import "../../style.css";
import "./basicGraph.css";
import useHttpReq from "../../http/request";
import * as constants from '../../constants';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useState,useMemo } from 'react';
import { KawayContext } from '../../kawayContext';
import { useContext } from 'react';
import MultiBtn from '../../pieces/graph-dur-selector/multi-btn';


export const ChartComponent = props => {
	const {		
		colors: {
			backgroundColor = 'white',
			lineColor = constants.COLORS.normal_blue,
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();	
	//const [chartContainerRef, setChartContainerRef] = useState();

	const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
	const [ctxDuration, setCtxDuration] = duration; 	
	const [selectedSecs, setSelectedSecs] = selectedSec;  
	const [durChgFlag, setDurChgFlag] = durChangedFlag;
	const [graphSelDuration, setGraphSelDuration] = useState(-99); 

	let [graphSelFlag,setGraphSelFlag] = useState(false); 
	
	//console.log('graphSelFlag 1 is'+graphSelFlag);
	// To Do - change it to a integer variable
    const ref = useRef(true);	

	useEffect(
		() => {

			
			const firstRender = ref.current;
			//console.log('basicGraph props is'+JSON.stringify(props));

			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 250,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			//console.log('graphDuration in graph =='+graphDuration);
			//console.log('graphSelDuration in graph =='+graphSelDuration);	
			//console.log('ctxDuration in graph =='+ctxDuration);		
			//console.log('firstRender in graph =='+firstRender);	

			if( firstRender){
				ref.current = false;
				setGraphSelDuration(ctxDuration);
			}

			if( (durChgFlag && ctxDuration != graphSelDuration)){
				
				//console.log('ctxDuration in ctxDuration check =='+ctxDuration);
				setGraphSelDuration(ctxDuration);				
				setDurChgFlag(false);					
			}


			if(graphSelDuration){
					
					let graphData = [];
					let tmpDuration = graphSelDuration;					
					//console.log('graphDuration in graphSelDuration check =='+graphDuration);
					//console.log('ctxDuration in graphSelDuration check =='+ctxDuration);
					//console.log('graphSelDuration in graphSelDuration check =='+graphSelDuration);
					const startDate = new Date();
					startDate.setDate(startDate.getDate() - tmpDuration);
					
					////console.log('setGraphData '+JSON.stringify(graphData));
	
					props.gdata.forEach(element => {				
						if(element != null && element.time != null && element.time.length>0){
							let parts = element.time.split('-');		
							let currDate = new Date(parts[0], parts[1] - 1, parts[2]); 
							if(currDate>startDate){
								const gPoint = {
									"time" : element.time,
									"value" : element.close
								}
								graphData.push(gPoint);
							}				
						}else{
							//console.log('bad data found '+JSON.stringify(element));
						}				
					});

				//console.log('setGraphData 4 is'+JSON.stringify(graphData));			
				newSeries.setData(graphData);	
			}
			
			window.addEventListener('resize', handleResize);			
			
			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[graphSelDuration,ctxDuration,selectedSecs,props.gdata]
	);	

	return (
		<div>
			<div class="graph-header">			
				<div class="stock-id"> 
					<p class="stock-id-text"> {props.security.displayId} </p>
				</div>   
				<MultiBtn class="range-select" graphDur={graphSelDuration} setGraphDur={setGraphSelDuration} setGraphSelFlag={setGraphSelFlag}/>	
			</div>		
			<div id="chart-container"
				ref={chartContainerRef}
			/>	
		</div>
			
	);
};



export default function BasicGraph(props) {
	
	let url = constants.SERVER_BASEURL+"/histData/"
	if(props != null && typeof props != 'undefined' && props.security != null && typeof props.security !='undefined'){
		url = url+props.security.exchange+"/"+props.security.code+"?type="+props.security.type+"&stDate=1995-05-12&endDate=2005-05-12";	
	}else{
		console.log('bad data in basicGraph'+JSON.stringify(props));
	}
	console.log('basicGraph props 2 '+JSON.stringify(props));
	
	let httpData = null;
	httpData  = useHttpReq(
		url,
		"GET",		
	);	
		
    if (httpData.loaded) {	
		if(httpData.error){
			return (
				<div class="graph-container">		
					<span>Error: {httpData.error}</span>
				</div>
			)
		}else{	
			console.log('basicGraph return 1 ');		
			return (

				(	
					<div class="graph-container" id="graph-container-1}">			 				
						<ChartComponent {...props} gdata={httpData.data}></ChartComponent>
					</div>
				)
			)
		}		
	  }

	return (
		<div class="graph-container">
			<p>Loading..</p>			
		</div>		
	);
}