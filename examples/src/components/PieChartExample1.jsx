// (C) 2007-2019 GoodData Corporation
import React, { Component } from "react";
import { PieChart, Model, AttributeFilter, ErrorComponent, HeaderPredicateFactory } from "@gooddata/react-components";
import ExampleWithExport from "./utils/ExampleWithExport";
import "@gooddata/react-components/styles/css/main.css";

import {
    projectId,
    avgCheckSizeIdentifier,
    locationResortIdentifier,
    locationResortUri
} from "../utils/fixtures";

const drillableItems = [
    HeaderPredicateFactory.identifierMatch(avgCheckSizeIdentifier),
];

export class PieChartExample1 extends Component {
    constructor(props){
        super(props);
        this.onApply =this.onApply.bind(this);
        this.state={
            drillEvent:null,
            filter:[],
            error:null,
        };
    }
    onDrill = drillEvent => {
        // eslint-disable-next-line no-console
        console.log(
            "onFiredDrillEvent",
            drillEvent,
            JSON.stringify(drillEvent.drillContext.intersection, null, 2),
        );
        this.setState({
            drillEvent,
        });
        return true;
    };

    renderDrillValue() {
        const { drillEvent } = this.state;

        if (!drillEvent) {
            return null;
        }

        const drillColumn = drillEvent.drillContext.row[drillEvent.drillContext.columnIndex];
        const drillValue = typeof drillColumn === "object" ? drillColumn.name : drillColumn;

        return (
            <h3>
                You have Clicked <span className="s-drill-value">{drillValue}</span>{" "}
            </h3>
        );
    }

    
    onLoadingChanged(...params) {
        // eslint-disable-next-line no-console
        return console.log("PieChartExample1 onLoadingChanged", ...params);
    }
    onApply(filter) {
        // eslint-disable-next-line no-console
        console.log("PieChartExample1 onApply", filter);
        this.setState({ filters: [], error: null });
        if (filter.in) {
            this.filterPositiveAttribute(filter);
        } else {
            this.filterNegativeAttribute(filter);
        }
    }

    onError(...params) {
        // eslint-disable-next-line no-console
        return console.log("PieChartExample1 onError", ...params);
    }
    filterPositiveAttribute(filter) {
        let filters;
        if (filter.in.length !== 0) {
            filters = [
                {
                    positiveAttributeFilter: {
                        displayForm: {
                            identifier: filter.id,
                        },
                        in: filter.in.map(element => `${locationResortUri}/elements?id=${element}`),
                    },
                },
            ];
        } else {
            this.setState({
                error: "The filter must have at least one item selected",
            });
        }
        this.setState({ filters });
    }
    filterNegativeAttribute(filter) {
        let filters;
        if (filter.notIn.length !== 0) {
            filters = [
                {
                    negativeAttributeFilter: {
                        displayForm: {
                            identifier: filter.id,
                        },
                        notIn: filter.notIn.map(element => `${locationResortUri}/elements?id=${element}`),
                    },
                },
            ];
        }
        this.setState({ filters });
    };       

    render() {
        const { filters, error } = this.state;
        const measures = [
            Model.measure(avgCheckSizeIdentifier).format("#,##0"),
        ];
        const locationResort=Model.attribute(locationResortIdentifier);  
        

        return (
            <div className="s-attribute-filter">                
                <AttributeFilter
                    identifier={locationResortIdentifier}
                    projectId={projectId}
                    fullscreenOnMobile={false}
                    onApply={this.onApply}
                />
                <div style={{ height: 700 }} >   
                         
                    <ExampleWithExport >  
                                   
                        {onExportReady => (
                            <div style={{ height: 600 }} className="s-pie-chart">
                                {error ? (
                                    <ErrorComponent message={error} />
                                ) : (   
                                    
                                    <PieChart
                                        projectId={projectId}
                                        measures={measures}
                                        viewBy={locationResort}
                                        filters={filters}                                        
                                        onExportReady={onExportReady}
                                        drillableItems={drillableItems}
                                        onFiredDrillEvent={this.onDrill}
                                        onLoadingChanged={this.onLoadingChanged}
                                        onError={this.onError}
                                    />
                                )}                    
                            </div>
                        )}
                    </ExampleWithExport>
                </div>
            </div>
        );
    }
}

export default PieChartExample1;
