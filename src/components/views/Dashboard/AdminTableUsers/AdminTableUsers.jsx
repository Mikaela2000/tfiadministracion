import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Switch, Typography, Grid, Modal, Backdrop, Fade } from "@mui/material";
import '@fontsource/roboto/400.css';
import { Card } from "react-bootstrap";

const AdminTableUsers = () => {
  // Datos de ejemplo
  const initialUsers = [
    {
      id: 1,
      name: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      createdAt: "2023-01-01",
      enabled: true,
      Properties: [{ title: "Property 1" }, { title: "Property 2" }],
      image: "https://via.placeholder.com/150",
      role: "Admin",
      phonenumber: "123456789",
      languaje: "English",
      score: 85,
    },
    {
      id: 2,
      name: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      createdAt: "2023-02-01",
      enabled: false,
      Properties: [],
      image: "https://via.placeholder.com/150",
      role: "User",
      phonenumber: null,
      languaje: "Spanish",
      score: 70,
    },
    // Agrega más usuarios de ejemplo aquí...
  ];

  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // Filtrar usuarios según el texto de búsqueda
  const filteredData = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Ordenar el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Título */}
      <Typography variant="h5" gutterBottom>
        Table Users
      </Typography>
      {/* Búsqueda */}
      <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
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
              {/* <TableCell># Properties</TableCell> */}
              <TableCell>Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell onClick={() => openModal(user)} style={{ cursor: "pointer" }}>{user.id}</TableCell>
                <TableCell onClick={() => openModal(user)} style={{ cursor: "pointer" }}>{user.name === null || user.lastname === null ? null : `${user.name} ${user.lastname}`}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                {/* <TableCell>{user.Properties.length}</TableCell> */}
                <TableCell>
                  <Switch
                    checked={user.enabled}
                    color="primary"
                    onChange={() => {
                      setUsers(prevUsers =>
                        prevUsers.map(u =>
                          u.id === user.id ? { ...u, enabled: !u.enabled } : u
                        )
                      );
                    }}
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

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Card style={{ width: '18rem' }}>
            <Card.Header><h5>Id: {selectedUser.id}</h5><h5>Email: {selectedUser.email}</h5></Card.Header>
            <Card.Img variant="top" src={selectedUser.image} />
            <Card.Title>Name: {selectedUser.name ? selectedUser.name : "Not registered"}</Card.Title>
            <Card.Title>Last name: {selectedUser.lastname ? selectedUser.lastname : "Not registered"}</Card.Title>
            <Card.Body>
              <div>
                <h6>Role: {selectedUser.role}</h6>
                <h6>Phone number: {selectedUser.phonenumber ? selectedUser.phonenumber : "Not registered"}</h6>
                <h6>Language: {selectedUser.languaje ? selectedUser.languaje : "Not registered"}</h6>
                <h6>Score: {selectedUser.score ? selectedUser.score : "Not registered"}</h6>
                {/* <h6>Properties: {selectedUser.Properties?.map(property => property.title).join(", ") || "Not found"}</h6> */}
              </div>
            </Card.Body>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdminTableUsers;
