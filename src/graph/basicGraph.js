import "../style.css";

import { priceData } from "../priceData";
import useHttpReq from "../http/request";
//import BasicGraph from "./basicGraph";
import { volumeData } from "../volumeData";

//import { createChart, CrosshairMode } from "lightweight-charts";

import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useMemo } from 'react';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	

	/*const httpData  = useHttpReq(
		"https://kaway-server-n3ahptldka-el.a.run.app/default",
		"GET",
		{
		  message: "Hello World",
		}
	  );

	console.log('arnabdata221 is '+ httpData.data);  
	const stringifiedData = JSON.stringify(httpData.data || {});
	console.log('stringifiedData is '+stringifiedData);

    if (httpData.loaded) {	
		return httpData.error ? (
		  <span>Error: {httpData.error}</span>
		) : (
		  <p>{stringifiedData}</p>
		);
	  }*/
	

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
			<div
				ref={chartContainerRef}
			/>	
		</div>
			
	);
};

const initialData1 = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
];


const initialData = [	
	{"time":"2020-03-16","value":46600000},
	{"time":"2020-03-17","value":46400000},
	{"time":"2020-03-18","value":44300000},
	{"time":"2020-03-19","value":45000000},
	{"time":"2020-03-20","value":44800000},
];

export default function App(props) {

	const httpData  = useHttpReq(
		"https://kaway-server-n3ahptldka-el.a.run.app/default",
		"GET",
		{
		  message: "Hello World",
		}
	  );

	console.log('arnabdata221 is '+ httpData.data);  
	const stringifiedData = JSON.stringify(httpData.data || {});
	console.log('stringifiedData is '+stringifiedData);

    if (httpData.loaded) {	
		return httpData.error ? (
		  <span>Error: {httpData.error}</span>
		) : (
			<div>
				<p>Arnab</p>
				<ChartComponent {...props} data={httpData.data}></ChartComponent>
			</div>
		);
	  }

	return (
		<div>
			<p>Arnab</p>			
		</div>		
	);
}