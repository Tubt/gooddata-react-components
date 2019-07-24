// (C) 2007-2019 GoodData Corporation
import React, { Component } from "react";
import { BarChart, Model } from "@gooddata/react-components";

import "@gooddata/react-components/styles/css/main.css";

import { totalSalesIdentifier,totalCostsIdentifier, locationResortIdentifier, projectId } from "../utils/fixtures";

export class BarChartExample extends Component {
    onLoadingChanged(...params) {
        // eslint-disable-next-line no-console
        console.info("BarChartExample onLoadingChanged", ...params);
    }

    onError(...params) {
        // eslint-disable-next-line no-console
        console.info("BarChartExample onLoadingChanged", ...params);
    }

    render() {
        const amount = [Model.measure(totalSalesIdentifier)
                             .format("#,##0")
                             .alias("$ Total Sales"),
                        Model.measure(totalCostsIdentifier)
                             .format("#,##0")
                             .alias("$ Total Cost"),
        ];

        const locationResort = Model.attribute(locationResortIdentifier);

        return (
            <div style={{ height: 600 }} className="s-bar-chart">
                <BarChart
                    projectId={projectId}
                    measures={amount}
                    viewBy={locationResort}                    
                    config ={{                        
                        legend:{
                            enabled:true,
                            position:'bottom'
                        },
                        yaxis:{
                            visible:true,
                            labelsEnabled:true,
                            rotation:30
                        },
                        xaxis:{
                            visible:true,
                            labelsEnabled:true,
                            rotation:30,
                            min:0,
                            max:16000000
                        },
                        //colors:['#14b2e2','#FA5858','#F7FE2E','#04B431','#FF00FF','#81F7F3'],
                        colorPalette:[{
                            guid:'01',
                            fill:{
                                r:162,
                                g:196,
                                b:0
                            }
                        },
                        {
                            guid:'02',
                            fill:{
                                r:217,
                                g:211,
                                b:0
                            }
                        }],
                        colorMapping:[{
                            predicate:(headerItem)=> {
                                return headerItem.measureHeaderItem&& (headerItem.measureHeaderItem.localIdentifier=='totalSalesIdentifier')
                            }
                        }]
                    }}
                    onLoadingChanged={this.onLoadingChanged}
                    onError={this.onError}
                />
            </div>
        );
    }
}

export default BarChartExample;
