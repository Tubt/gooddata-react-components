// (C) 2007-2019 GoodData Corporation
import React from "react";

import ExampleWithSource from "../components/utils/ExampleWithSource";

import DonutChartExample1 from "../components/DonutChartExample1";
import PieChartExample1 from "../components/PieChartExample1";
import TreemapExample1 from "../components/TreemapExample1";
import TreemapExample2 from "../components/TreemapExample2";
import HeatmapExample1 from "../components/HeatmapExample1";
import HeatmapExample2 from "../components/HeatmapExample2";
import LocalAttributeFilter from "../components/LocalAttributeFilter";


import DonutChartExample1SRC from "!raw-loader!../components/DonutChartExample1"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first
import PieChartExample1SRC from "!raw-loader!../components/PieChartExample1"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first
import TreemapExample1SRC from "!raw-loader!../components/TreemapExample1"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first
import TreemapExample2SRC from "!raw-loader!../components/TreemapExample2"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first
import HeatmapExample1SRC from "!raw-loader!../components/HeatmapExample1"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first
import HeatmapExample2SRC from "!raw-loader!../components/HeatmapExample2"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first
import LocalAttributeFilterSRC from "!raw-loader!../components/LocalAttributeFilter"; // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/first

export const TestVersion7_1_0 = () => (
    <div>
        <h1>Test version 7.1.0-beta.12</h1>
        <p>
            I'm checking Donut/ Pie/ Treemap/ Heatmap chart.
        </p>        

        <h2 id="donut-chart">Donut chart</h2>
        <ExampleWithSource for={DonutChartExample1} source={DonutChartExample1SRC} />

        <h2 id="pie-chart">Pie chart</h2>
        <ExampleWithSource for={PieChartExample1} source={PieChartExample1SRC} />

        <h2 id="treemap">Treemap</h2>
        <ExampleWithSource for={TreemapExample1} source={TreemapExample1SRC} />

        <h2 id="treemap">Treemap has some measures</h2>
        <ExampleWithSource for={TreemapExample2} source={TreemapExample2SRC} />

        <h2 id="heatmap">Heatmap has 1 measure, 1 attribute on Rows, 1 attribute on Columns</h2>
        <ExampleWithSource for={HeatmapExample1} source={HeatmapExample1SRC} />

        <h2 id="heatmap">Heatmap has some measures, 1 attribute on Rows, 1 attribute on Columns</h2>
        <ExampleWithSource for={HeatmapExample2} source={HeatmapExample2SRC} />

        <h2 id="PivotTable">Check filter</h2>
        <ExampleWithSource for={LocalAttributeFilter} source={LocalAttributeFilterSRC} />
    </div>
);

export default TestVersion7_1_0;
