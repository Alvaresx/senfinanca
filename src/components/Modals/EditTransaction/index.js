import React, { useContext, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import Context from "../../../context";
import { Formik, Form } from "formik";
import { categories, types, validationSchema } from "./definitions";
import Input from "../../Input";
import styles from "./style.module.scss";

const EditTransaction = () => {
  const formikRef = useRef(null);
  const {
    setIsEditModalOpen,
    handleEditTransaction,
    title,
    value,
    category,
    type,
  } = useContext(Context);

  const initialValues = {
    title,
    value,
    type,
    category,
  };

  return (
    <Dialog onClose={() => setIsEditModalOpen(false)} open>
      <DialogTitle>Editar transação</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edite facilmente sua transação preenchendo os campos abaixo.
        </DialogContentText>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleEditTransaction(values);
          }}
        >
          <Form className={styles.form}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input name="title" label="Título" />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input name="value" label="Valor" />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input select name="type" label="Tipo">
                  {types.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Input>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Input select name="category" label="Categoria">
                  {categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Input>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
        <Button onClick={() => formikRef.current.submitForm()}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransaction;
