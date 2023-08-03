import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import DeleteTransaction from "../../components/Modals/DeleteTransaction";
import EditTransaction from "../../components/Modals/EditTransaction";
import Context from "../../context";
import { getFormattedCurrentDate } from "../../utils/getFormattedCurrentDate";
import { categories, tableHeaderTitles, types } from "./definitions";
import styles from "./style.module.scss";

const TransactionsTableView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [getDataStorage] = useState(
    JSON.parse(localStorage.getItem("transacoes"))
  );

  useEffect(() => {
    if (getDataStorage) setRows(getDataStorage);
    else setRows([]);
  }, [getDataStorage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleOpenDeleteModal = (title) => {
    setTitle(title);
    setIsDeleteModalOpen(true);
  };

  const handleOpenEditModal = (title, type, value, category) => {
    setTitle(title);
    setType(type);
    setValue(value);
    setCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteTransaction = () => {
    for (let i = 0; i < getDataStorage.length; i++) {
      if (getDataStorage[i].title === title) {
        getDataStorage.splice(i, 1);
      }
    }
    setRows(getDataStorage);
    localStorage.setItem("transacoes", JSON.stringify(getDataStorage));
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
    localStorage.setItem("transacoes", JSON.stringify(getDataStorage));
    enqueueSnackbar("Transação editada com sucesso!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
    setIsEditModalOpen(false);
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    let selected = [];
    if (categoryFilter && categoryFilter !== "Todas") {
      selected = selectedCategory.filter((value) => value.type === type);
    } else {
      selected = getDataStorage.filter((value) => value.type === type);
    }
    setSelectedType(selected);
    if (type === "Todos" && (!categoryFilter || categoryFilter === "Todas")) {
      setRows(getDataStorage);
    } else if (type === "Todos" && categoryFilter) {
      setRows(selectedCategory);
    } else {
      setRows(selected);
    }
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    let selected = [];
    if (typeFilter && typeFilter !== "Todos") {
      selected = selectedType.filter((value) => value.category === category);
    } else {
      selected = getDataStorage.filter((value) => value.category === category);
    }
    setSelectedCategory(selected);
    if (category === "Todas" && (!typeFilter || typeFilter === "Todos")) {
      setRows(getDataStorage);
    } else if (category === "Todas" && typeFilter) {
      setRows(selectedType);
    } else {
      setRows(selected);
    }
  };

  const handleResetFilters = () => {
    setTypeFilter("");
    setCategoryFilter("");
    if (getDataStorage) setRows(getDataStorage);
    else setRows([]);
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
                  value={typeFilter}
                  fullWidth
                  onChange={(e) => handleTypeFilter(e.target.value)}
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
                  value={categoryFilter}
                  fullWidth
                  onChange={(e) => handleCategoryFilter(e.target.value)}
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
                            handleOpenEditModal(
                              row.title,
                              row.type,
                              row.value,
                              row.category
                            )
                          }
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir" placement="right">
                        <IconButton
                          onClick={() => handleOpenDeleteModal(row.title)}
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
