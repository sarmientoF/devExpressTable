import React, { useState } from "react";

import "devextreme/data/odata/store";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import { TableGrid } from "./TableGrid";

function isNotEmpty(value: any) {
	return value !== undefined && value !== null && value !== "";
}

const App = () => {
	const store = new CustomStore({
		key: "OrderNumber",
		load(loadOptions: any) {
			console.log("loadOptions", loadOptions);
			// TODO: Use load options to calculate page and organize your filters
			let params = "?";
			[
				"skip",
				"take",
				"requireTotalCount",
				"requireGroupCount",
				"sort",
				"filter",
				"totalSummary",
				"group",
				"groupSummary",
			].forEach((i) => {
				if (i in loadOptions && isNotEmpty(loadOptions[i])) {
					params += `${i}=${JSON.stringify(loadOptions[i])}&`;
				}
			});
			params = params.slice(0, -1);
			// TODO: Change the fetch url to your own, using graphql refetch
			return fetch(
				`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
			)
				.then((response) => response.json())
				.then((data) => ({
					data: data.data,
					totalCount: data.totalCount, //TODO: Check if backend returns the total number of elements. I think you migth have the total number of elements in the response.
					summary: data.summary,
					groupCount: data.groupCount,
				}))
				.catch(() => {
					throw new Error("Data Loading Error");
				});
		},
	});
	return (
		<div>
			<TableGrid store={store} />
		</div>
	);
};

export default App;
