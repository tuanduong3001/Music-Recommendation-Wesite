
import React from 'react';
import { HeaderCommon } from '../components/Header/common';
import { SearchLayout } from '../components/Search';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../stores/hook';
import { GridActionsCellItem, GridValueGetterParams } from '@mui/x-data-grid';
import { setDetail, setField, setReset } from '../reducers/reset';
import { Table } from '../components/Table';
import { deleteMusic, deleteUser } from '../components/Table/action';
const Music = () => {
  const musics = useAppSelector((state: any) => state.music.musics);
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.reset.reset);
  const columnMusic = [
    { field: 'name', headerName: 'Tên', width: 200 },
    { field: 'category', headerName: 'Thể loại', width: 200,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.category?.name;
    }, 
  },
  { field: 'artist', headerName: 'Ca sĩ', width: 200,
  valueGetter: (params: GridValueGetterParams) => {
    const listArtist =  params.row.artist?.map((artist:any) => artist.name);
    return listArtist.join(',');
  }, 
},
  { field: 'like', headerName: 'Lượt yêu thích', width: 100 },
  { field: 'view', headerName: 'Lượt xem', width: 100 },
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
            await deleteMusic(params.id);
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
  return <HeaderCommon title="Nhạc">
      <SearchLayout layout="musics" />
        <Box sx={{ width: '100%', marginTop: '20px', textAlign: 'end' }}>
          <Button variant="contained" color="success" onClick={() => dispatch(setField('create'))}>
          Thêm
          </Button>
        </Box>
        {musics && <Table title="Nhạc" data={musics} column={columnMusic} />}
  </HeaderCommon>;
};

export default Music;
