import { Box, Button } from '@mui/material';
import { GridActionsCellItem, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import { HeaderCommon } from '../components/Header/common';
import { SearchLayout } from '../components/Search';
import { setDetail, setField, setReset } from '../reducers/reset';
import { Table } from '../components/Table';
import { useAppDispatch, useAppSelector } from '../stores/hook';
import { deleteCategory, deleteUser } from '../components/Table/action';
const Category = () => {
  const categories = useAppSelector((state: any) => state.category.categories);
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.reset.reset);
  const columnCategory = [
    { field: 'name', headerName: 'Tên', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Ngày Tạo',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.createdAt.split('T')[0];
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày Cập Nhật',
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
            await deleteCategory(params.id);
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
      <HeaderCommon title="Thể loại">
        <SearchLayout layout="categories" />
        <Box sx={{ width: '100%', marginTop: '20px', textAlign: 'end' }}>
          <Button variant="contained" color="success" onClick={() => dispatch(setField('create'))}>
          Thêm
          </Button>
        </Box>
        {categories && <Table title="Thể loại" data={categories} column={columnCategory} />}
      </HeaderCommon>
    </>
  );
};

export default Category;
