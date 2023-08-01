import { GridView, Add, CompareArrows } from "@mui/icons-material";

export const sidebarItems = [
  {
    text: "Dashboard",
    icon: <GridView />,
    path: "/",
  },
  {
    text: "Criar transação",
    icon: <Add />,
    path: "/registro",
  },
  {
    text: "Transações",
    icon: <CompareArrows />,
    path: "/transacoes",
  },
];
