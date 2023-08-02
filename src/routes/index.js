import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardView from "../views/Dashboard";
import TransactionsTableView from "../views/TransactionsTable";
import CreateTransactionsContainer from "../containers/CreateTransactions";

const routes = () => (
  <Routes>
    <Route element={<DashboardView />} path="/"></Route>
    <Route element={<CreateTransactionsContainer />} path="registro"></Route>
    <Route element={<TransactionsTableView />} path="transacoes"></Route>
  </Routes>
);
export default routes;
