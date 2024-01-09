import { DataGrid } from "@mui/x-data-grid";
import * as React from 'react';

export function TableData ({data, column}:any) {
  
    return (
     
      <DataGrid
      rows={data}
      columns={column}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      checkboxSelection
    />
    );
  }