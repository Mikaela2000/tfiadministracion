import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Switch, Typography, Grid } from "@mui/material";
import '@fontsource/roboto/400.css';
import RegistarUsuario from '../../../inc/PanelRegistrarse/PanelRegistrarse';

const AdminTableUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  console.log("soy el usuario", users)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  

  useEffect(() => {
    dispatch(actions.getAllUsers());
  }, [dispatch]);

  const filteredData = users.filter(user =>
    (user.name ? user.name.toLowerCase() : '').includes(searchText.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggle = (user) => {
    const newEnabledStatus = !user.enabled;
    dispatch(actions.changeEnabledUser(user.id, newEnabledStatus));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Table Users
      </Typography>

      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item xs={12} md={2}>
          <RegistarUsuario />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>

      <div style={{ marginBottom: '16px' }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name === null || user.lastname === null ? null : `${user.name} ${user.lastname}`}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.enabled}
                    color="primary"
                    onChange={() => handleToggle(user)}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {user.enabled ? 'Enabled' : 'Disabled'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginBottom: '8px' }}></div>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminTableUsers;
