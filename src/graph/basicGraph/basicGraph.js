import "../../style.css";
import "./basicGraph.css"

import useHttpReq from "../../http/request";
import * as constants from '../../constants';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useState } from 'react';

import { KawayContext } from '../../kawayContext';
import { useContext } from 'react';

import MultiBtn from '../../pieces/multi-btn/multi-btn'

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
	const { duration, allAvlSec, selEx,selectedSec } = useContext(KawayContext);
	const [ctxDuration, setCtxDuration] = duration; 
	const [httpData, setHttpData] = useState(props.gdata); 
	const [graphData, setGraphData] = useState([]); 

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });

			console.log('duration in graph =='+ctxDuration);
			const startDate = new Date();
			startDate.setDate(startDate.getDate() - ctxDuration);

			setGraphData([]);
			//console.log('setGraphData '+JSON.stringify(graphData));

			httpData.forEach(element => {
				/*console.log('bad data found '+element.time);*/
				if(element != null && element.time != null && element.time.length>0){
					let parts = element.time.split('-');		
					let currDate = new Date(parts[0], parts[1] - 1, parts[2]); 
					if(currDate>startDate){
						const gPoint = {
							"time" : element.time,
							"value" : element.value
						}
						graphData.push(gPoint);
					}				
				}else{
					console.log('bad data found '+JSON.stringify(element));
				}
				
			});

			newSeries.setData(graphData);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor,duration,httpData]
	);

	return (
		<div>
			<div class="graph-header">			
				<div class="stock-id"> 
					<p class="stock-id-text"> {props.displayId} </p>
				</div>   
				<MultiBtn class="range-select"/>	
			</div>		
			<div
				ref={chartContainerRef}
			/>	
		</div>
			
	);
};


export default function App(props) {
	//console.log('1 props is '+ JSON.stringify(props));  

	let url = constants.SERVER_BASEURL+"/histData/"+props.exchange+"/"+props.code+"?stDate=1995-05-12&endDate=2005-05-12";	

	const httpData  = useHttpReq(
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
			
			/*httpData.data.forEach(element => {
				graphdata.push(element);
			})

			useEffect(
				() => {
					httpData.data.array.forEach(element => {
						graphdata.push(element);
					});				
			},[ctxDuration]);*/
			return (
				(
					<div class="graph-container">			 				
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