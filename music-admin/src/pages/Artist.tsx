import { GridActionsCellItem, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../stores/hook";
import { Avatar, Box, Button } from "@mui/material";
import { setDetail, setField, setReset } from "../reducers/reset";
import { deleteArtist, deleteCategory } from "../components/Table/action";
import { HeaderCommon } from "../components/Header/common";
import { SearchLayout } from "../components/Search";
import { Table } from "../components/Table";
import React from "react";

const Artist = () => {
    const artists = useAppSelector((state: any) => state.artist.artist);
    const dispatch = useAppDispatch();
    const reset = useAppSelector((state: any) => state.reset.reset);
    const columnCategory = [
      { field: 'name', headerName: 'Tên', width: 200 },
      { field: 'title', headerName: 'Giới thiệu', width: 200 },
      {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        width: 200,
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.createdAt.split('T')[0];
        },
      },
      {
        field: 'updatedAt',
        headerName: 'Ngày cập nhật',
        width: 200,
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.updatedAt.split('T')[0];
        },
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Thao tác',
        width: 500,
        getActions: (params: any) => [
          <GridActionsCellItem
            key={1}
            icon={
              <Button variant="contained" color="success">
                Xóa
              </Button>
            }
            label="Delete"
            onClick={async () => {
              await deleteArtist(params.id);
              dispatch(setReset(!reset))
            }}
          />,
          <GridActionsCellItem
            key={2}
            icon={
              <Button variant="contained" color="secondary">
                Sửa
              </Button>
            }
            label="Edit"
            onClick={async () => {
              dispatch(setDetail(params.row));
              dispatch(setField("edit"))
            }}
          />,
          <GridActionsCellItem
            key={3}
            icon={<Button variant="contained">Xem chi tiết</Button>}
            label="Detail"
            onClick={async () => {
              dispatch(setDetail(params.row));
              dispatch(setField("detail"))
            }}
          />,
        ],
      },
    ];
    return (
      <>
        <HeaderCommon title="Ca sĩ">
          <SearchLayout layout="artists" />
          <Box sx={{ width: '100%', marginTop: '20px', textAlign: 'end' }}>
            <Button variant="contained" color="success" onClick={() => dispatch(setField('create'))}>
            Thêm
            </Button>
          </Box>
          {artists && <Table title="Ca sĩ" data={artists} column={columnCategory} />}
        </HeaderCommon>
      </>
    );
  };
  
  export default Artist;