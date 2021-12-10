import DataGrid, {
	Column,
	Paging,
	Pager,
	FilterRow,
} from "devextreme-react/data-grid";
import React, { useState } from "react";

interface Props {
	store: any;
}
const allowedPageSizes = [8, 12, 20];

export const TableGrid = ({ store }: Props) => {
	// const [currentPage, setCurrentPage] = useState(0); // If you want custom page number

	return (
		<DataGrid dataSource={store} showBorders={true} remoteOperations={true}>
			<FilterRow visible={true} />
			<Column dataField="OrderNumber" dataType="string" />
			<Column dataField="OrderDate" dataType="date" />
			<Column dataField="StoreCity" dataType="string" />
			<Column dataField="StoreState" dataType="string" />
			<Column dataField="Employee" dataType="string" />
			<Column dataField="SaleAmount" dataType="number" format="currency" />
			<Paging
				defaultPageSize={12}
				// pageIndex={currentPage} // If you want custom page number
				// onPageIndexChange={setCurrentPage} // // If you want custom page number
			/>
			<Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
		</DataGrid>
	);
};
