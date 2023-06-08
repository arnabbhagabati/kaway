import "../../style.css";
import "./basicGraph.css"

import useHttpReq from "../../http/request";
import * as constants from '../../constants';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useMemo } from 'react';

import { KawayContext } from '../../kawayContext';
import { useContext } from 'react';

import MultiBtn from '../../pieces/multi-btn/multi-btn'

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = constants.COLORS.normal_blue,
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();	

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
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div>
			<div class="graph-header">			
				<div class="stock-id"> 
					<p class="stock-id-text"> {props.exchange}: {props.code} </p>
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

	let url = constants.SERVER_BASEURL+"/histData/"+props.exchange+"/"+props.secId+"?stDate=1995-05-12&endDate=2005-05-12";	

	const httpData  = useHttpReq(
		url,
		"GET",		
	  );	

    if (httpData.loaded) {	
		return httpData.error ? (
			<div class="graph-container">		
				<span>Error: {httpData.error}</span>
			</div>
		  
		) : (
			<div class="graph-container">			 				
				<ChartComponent {...props} data={httpData.data}></ChartComponent>
			</div>
		);
	  }

	return (
		<div class="graph-container">
			<p>Loading..</p>			
		</div>		
	);
}