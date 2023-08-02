import React from "react";
import { Formik, Form } from "formik";
import Input from "../../components/Input";
import {
  Box,
  Toolbar,
  Paper,
  Grid,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import {
  categories,
  initialValues,
  types,
  validationSchema,
} from "./definitions";
import styles from "./style.module.scss";

const CreateTransactionsView = ({ handleRegister }) => (
  <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleRegister(values, resetForm);
      }}
    >
      <Box
        component="main"
        className={styles.box}
        sx={{
          width: { md: `calc(100% - 250px)` },
        }}
      >
        <Form className={styles.form}>
          <Toolbar />
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h5" className={styles.title}>
                Registrar Transação
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aqui você poderá registrar suas transações.
              </Typography>
            </Grid>
          </Grid>
          <Paper elevation={2} className={styles.paper}>
            <Grid container spacing={3}>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Input name="title" label="Título" />
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Input name="value" label="Valor" />
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Input select name="type" label="Tipo">
                  {types.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Input>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Input select name="category" label="Categoria">
                  {categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Input>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item lg={2} md={2} sm={2} xs={6}>
                <Button
                  variant="contained"
                  className={styles.registerButton}
                  type="submit"
                  fullWidth
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      </Box>
    </Formik>
  </>
);

export default CreateTransactionsView;
