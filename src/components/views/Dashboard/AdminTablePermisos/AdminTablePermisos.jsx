import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import RegistarUsuario from '../../../inc/PanelRegistrarse/PanelRegistrarse';
import * as actions from "../../../../redux/actions";

const AdminTableUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  // Filtrado de usuarios por nombre
  const filteredData = users.filter(user =>
    (user.name ? user.name.toLowerCase() : '').includes(searchText.toLowerCase())
  );

  // Cambiar página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Cambiar rol de usuario
  const handleToggle = (user, role) => {
    dispatch(actions.changeRoleUser(user.id, role)); 

  };

  useEffect(() => {
    dispatch(actions.getAllUsers()); // Obtiene todos los usuarios al cargar
  }, [dispatch]);

  return (
    <div>
      {/* Título */}
      <Typography variant="h5" gutterBottom>
        Table Permissions
      </Typography>

      {/* Búsqueda */}
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
      
      {/* Tabla de Usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell> {/* Columna para el rol */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.name === null || user.lastname === null ? null : `${user.name} ${user.lastname}`}
                </TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleToggle(user, e.target.value)} // Pasa el rol seleccionado
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="employee">Empleado</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginado */}
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
