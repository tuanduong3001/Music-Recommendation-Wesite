
import { Avatar, Box, Button } from '@mui/material';
import { GridActionsCellItem, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import { ResetPassword } from '../apis/user';
import { HeaderCommon } from '../components/Header/common';
import { SearchLayout } from '../components/Search';
import { Table } from '../components/Table';
import { deleteUser } from '../components/Table/action';
import { setDetail, setField, setReset } from '../reducers/reset';
import { useAppDispatch, useAppSelector } from '../stores/hook';
const UserRole = ["user", "admin"]
const UserGender = ["male", "female"]

const User = () => {
    const users = useAppSelector((state:any)=>state.user.users);
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state:any)=>state.reset.reset)
  const  columnsUsers = [
    {field: 'email', headerName: 'Email', width: 200 },
    {field: 'avatar', headerName: 'Ảnh đại diện', width: 100,
    renderCell: (params:any) => {
      return (
        <>
          <Avatar src={params.row.avatar} />
        </>
      );
    }
  },
    {field: 'name', headerName: 'Tên', width: 200 },
    {field: 'dateOfBirth', headerName: 'Ngày sinh', width: 100 },
    {field: 'role', headerName: 'Vai trò', width: 100,
    valueGetter: (params: GridValueGetterParams) =>
{
    return UserRole[params.row.role -1]
}
  },
  {field: 'gender', headerName: 'Giới tính', width: 100,
  valueGetter: (params: GridValueGetterParams) =>
{
  return UserGender[params.row.gender -1]
}
},
    {
    field: 'actions',
    type: 'actions',
    headerName: 'Thao tác',
    width: 500,
    getActions: (params:any) => [
     
      <GridActionsCellItem
      key={1}
      icon={ <Button variant="contained" color="success">Xóa</Button>}
      label="Delete"
      onClick={async()=> {
        await deleteUser(params.id);
        dispatch(setReset(!reset))
      }}
    />,
    <GridActionsCellItem
    key={2}
    icon={ <Button variant="contained" color="secondary">Sửa</Button>}
    label="Edit"
    onClick={async()=> {

      dispatch(setDetail(params.row));
      dispatch(setField("edit"))
    }}
  />,
   <GridActionsCellItem
   key={3}
   icon={ <Button variant="contained" >Xem chi tiết</Button>}
   label="Detail"
   onClick={async()=> {

    dispatch(setDetail(params.row));
    dispatch(setField("detail"))
  }}
  />
    ] 
  },
  ]
  return <>
   <HeaderCommon title="Người dùng">
      <SearchLayout layout="users"/>
      <Box sx={{width: "100%", marginTop: "20px", textAlign: "end"}} >
      <Button variant="contained" color="success"  onClick={()=> dispatch(setField("create"))}>Thêm</Button>
      </Box>
      {users && <Table title="Người dùng" data={users}  column = {columnsUsers}/>}
    </HeaderCommon>
  </>;
};

export default User;