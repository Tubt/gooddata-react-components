// (C) 2007-2019 GoodData Corporation
import React, { Component } from "react";
import { Treemap, Model, AttributeFilter, ErrorComponent, HeaderPredicateFactory } from "@gooddata/react-components";
import ExampleWithExport from "./utils/ExampleWithExport";

import "@gooddata/react-components/styles/css/main.css";

import {
    franchiseFeesIdentifier,
    franchisedSalesIdentifier,
    //grossProfitIdentifier,
    totalSalesIdentifier,
    ownedSalesIdentifier,
    locationResortUri,
    locationResortIdentifier,
    projectId,
} from "../utils/fixtures";

const drillableItems = [
    HeaderPredicateFactory.identifierMatch(franchiseFeesIdentifier),
    HeaderPredicateFactory.identifierMatch(franchisedSalesIdentifier),
];

export class TreeMapExample2 extends Component {
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
    onApply(filter) {
        // eslint-disable-next-line no-console
        console.log("TreemapExample2 onApply", filter);
        this.setState({ filters: [], error: null });
        if (filter.in) {
            this.filterPositiveAttribute(filter);
        } else {
            this.filterNegativeAttribute(filter);
        }
    }
    onLoadingChanged(...params) {
        // eslint-disable-next-line no-console
        console.info("TreeMapExample2 onLoadingChanged", ...params);
    }

    onError(...params) {
        // eslint-disable-next-line no-console
        console.info("TreeMapExample2 onLoadingChanged", ...params);
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
            Model.measure(franchiseFeesIdentifier)
                .format("#,##0")
                .alias("#Franchise Fees"),
            Model.measure(franchisedSalesIdentifier)
                .format("#,##0")
                .alias("#Franchise Sales"),
            // Model.measure(grossProfitIdentifier)
            //     .format("#,##0")
            //     .alias("#Gross Profit"),
            Model.measure(totalSalesIdentifier)
                .format("#,##0")
                .alias("#Total Sales"),
            Model.measure(ownedSalesIdentifier)
                .format("#,##0")
                .alias("#Owned Sales"),
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
                            <div style={{ height: 600 }} className="s-tree-map">
                                {error ? (
                                    <ErrorComponent message={error} />
                                ) : ( 
                                    <Treemap
                                        projectId={projectId}
                                        measures={measures}
                                        //viewBy={locationResort}
                                        segmentBy={locationResort}
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

export default TreeMapExample2;
