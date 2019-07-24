// (C) 2007-2019 GoodData Corporation
import React, { Component } from "react";
import { PivotTable, Model } from "@gooddata/react-components";
import ExampleWithExport from "./utils/ExampleWithExport";

import "@gooddata/react-components/styles/css/main.css";

import {
    yearDateIdentifier,
    dateDataSetUri,
    totalSalesIdentifier,
    ownedSalesIdentifier,    
    locationResortIdentifier,
    locationResortAttributeValue,
    projectId,
} from "../utils/fixtures";
import { TextFilter } from "ag-grid-community";


export class LocalAttributeFilter extends Component {       
    onLoadingChanged(...params) {
        // eslint-disable-next-line no-console
        console.info("LocalAttributeFilter onLoadingChanged", ...params);
    }

    onError(...params) {
        // eslint-disable-next-line no-console
        console.info("LocalAttributeFilter onLoadingChanged", ...params);
    }
    

    render() {
        
        const measures = [            
            Model.measure(totalSalesIdentifier)
                .format("#,##0")
                .alias("#Total Sales"),
            Model.measure(ownedSalesIdentifier)
                .format("#,##0")
                .alias("#Owned Sales"),
        ];
        const attributes=[  
            Model.attribute(locationResortIdentifier),                            
            Model.attribute(yearDateIdentifier).localIdentifier("year"),
        ];     


        const absoluteDateFilters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];
        const relativeDateFilters = [Model.absoluteDateFilter(dateDataSetUri, "2017-01-01", "2017-12-31")];
        const positiveAttributeFilters=[
            Model.positiveAttributeFilter(locationResortIdentifier,[locationResortAttributeValue],false),
        ];
        const positiveAttributeFilters2=[
             Model.positiveAttributeFilter(locationResortIdentifier,["Hayward","San Jose","Dallas"],true),
        ];

        return (
            <div style={{ height: 700 }} >
                <h1>ads</h1> 
                <ExampleWithExport>
                    {onExportReady => (
                        <div style={{ height: 600 }} className="s-pivot-table">
                            <PivotTable
                                projectId={projectId}
                                measures={measures}                
                                rows={attributes}
                                filters={positiveAttributeFilters}    
                                onExportReady={onExportReady}                                    
                                onLoadingChanged={this.onLoadingChanged}
                                onError={this.onError}
                            />
                        </div>
                    )}
                </ExampleWithExport>
            </div>
        );
    }
}

export default LocalAttributeFilter;
