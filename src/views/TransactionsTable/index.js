import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Paper,
  Tooltip,
  IconButton,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Context from "../../context";
import { categories, tableHeaderTitles, types } from "./definitions";
import styles from "./style.module.scss";
import DeleteTransaction from "../../components/Modals/DeleteTransaction";
import EditTransaction from "../../components/Modals/EditTransaction";
import { useSnackbar } from "notistack";
import { getFormattedCurrentDate } from "../../utils/getFormattedCurrentDate";

const TransactionsTableView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tipoFilter, setTipoFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [tipoSelected, setTipoSelected] = useState([]);
  const [categoriaSelected, setCategoriaSelected] = useState([]);
  const [getDataStorage] = useState(
    JSON.parse(localStorage.getItem("transacoes"))
  );

  useEffect(() => {
    if (getDataStorage) {
      setRows(getDataStorage);
    } else {
      setRows([]);
    }
  }, [getDataStorage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDeleteDialog = (title) => {
    setIsDeleteModalOpen(true);
    setTitle(title);
  };

  const handleOpenEditDialog = (title, type, category, value) => {
    setTitle(title);
    setType(type);
    setCategory(category);
    setValue(value);
    setIsEditModalOpen(true);
  };

  const handleDeleteTransaction = () => {
    for (let i = 0; i < getDataStorage.length; i++) {
      if (getDataStorage[i].title === title) {
        getDataStorage.splice(i, 1);
      }
    }
    setRows(getDataStorage);
    let dataStringfy = JSON.stringify(getDataStorage);
    localStorage.setItem("transacoes", dataStringfy);
    enqueueSnackbar("Transação excluída com sucesso!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
    setIsDeleteModalOpen(false);
  };

  const handleEditTransaction = (values) => {
    for (let i = 0; i < getDataStorage.length; i++) {
      if (getDataStorage[i].title === title) {
        getDataStorage[i].title = values.title;
        getDataStorage[i].category = values.category;
        getDataStorage[i].value = values.value;
        getDataStorage[i].type = values.type;
        getDataStorage[i].date = getFormattedCurrentDate() + " (Editado)";
      }
    }
    setRows(getDataStorage);
    let dataStringfy = JSON.stringify(getDataStorage);
    localStorage.setItem("transacoes", dataStringfy);
    enqueueSnackbar("Transação editada com sucesso!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
    setIsEditModalOpen(false);
  };

  const handleFilterTipo = (type) => {
    setTipoFilter(type);
    let selected = [];
    if (categoriaFilter !== "" && categoriaFilter !== "Todas") {
      selected = categoriaSelected.filter((value) => value.type === type);
    } else {
      selected = getDataStorage.filter((value) => value.type === type);
    }
    setTipoSelected(selected);
    if (
      type === "Todos" &&
      (categoriaFilter === "" || categoriaFilter === "Todas")
    ) {
      setRows(getDataStorage);
    } else if (type === "Todos" && categoriaFilter !== "") {
      setRows(categoriaSelected);
    } else {
      setRows(selected);
    }
  };

  const handleFilterCategoria = (category) => {
    setCategoriaFilter(category);
    let selected = [];
    if (tipoFilter !== "" && tipoFilter !== "Todos") {
      selected = tipoSelected.filter((value) => value.category === category);
    } else {
      selected = getDataStorage.filter((value) => value.category === category);
    }
    setCategoriaSelected(selected);
    if (category === "Todas" && (tipoFilter === "" || tipoFilter === "Todos")) {
      setRows(getDataStorage);
    } else if (category === "Todas" && tipoFilter !== "") {
      setRows(tipoSelected);
    } else {
      setRows(selected);
    }
  };

  const handleResetFilters = () => {
    setTipoFilter("");
    setCategoriaFilter("");
    if (getDataStorage) {
      setRows(getDataStorage);
    } else {
      setRows([]);
    }
  };

  return (
    <>
      <Context.Provider
        value={{
          isDeleteModalOpen,
          setIsDeleteModalOpen,
          isEditModalOpen,
          setIsEditModalOpen,
          handleDeleteTransaction,
          handleEditTransaction,
          title,
          category,
          value,
          type,
        }}
      >
        <Box
          component="main"
          className={styles.box}
          sx={{
            width: { md: `calc(100% - 250px)` },
          }}
        >
          <Toolbar />
          <Grid container>
            <Grid item lg={12} md={12}>
              <Typography variant="h5" className={styles.title}>
                Transações
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aqui você poderá visualizar as informações das suas transações,
                bem como editar e/ou excluí-las.
              </Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              sx={{ padding: "16px" }}
            >
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Filtros:
                </Typography>
              </Grid>
              <Grid item lg={2} md={3} sm={3} xs={3}>
                <TextField
                  select
                  size="small"
                  label="Tipo"
                  value={tipoFilter}
                  fullWidth
                  onChange={(e) => handleFilterTipo(e.target.value)}
                >
                  {types.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={2} md={3} sm={3} xs={3}>
                <TextField
                  select
                  size="small"
                  label="Categoria"
                  value={categoriaFilter}
                  fullWidth
                  onChange={(e) => handleFilterCategoria(e.target.value)}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={2}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleResetFilters}
                >
                  Resetar
                </Button>
              </Grid>
            </Grid>
            <Table size="small" aria-label="Tabela de transações">
              <TableHead>
                <TableRow>
                  {tableHeaderTitles.map((title) => (
                    <TableCell key={title} align="center">
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar" placement="left">
                        <IconButton
                          onClick={() =>
                            handleOpenEditDialog(
                              row.title,
                              row.type,
                              row.category,
                              row.value
                            )
                          }
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir" placement="right">
                        <IconButton
                          onClick={() => handleOpenDeleteDialog(row.title)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todas", value: -1 },
                    ]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Linhas por página:"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} de ${count}`
                    }
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>

        {/* MODAL DE EXCLUSÃO DA TRANSAÇÃO */}
        {isDeleteModalOpen && <DeleteTransaction />}

        {/* MODAL DE EDIÇÃO DA TRANSAÇÃO */}
        {isEditModalOpen && <EditTransaction />}
      </Context.Provider>
    </>
  );
};

export default TransactionsTableView;
