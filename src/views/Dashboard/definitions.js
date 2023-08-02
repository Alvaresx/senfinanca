import {
  Add,
  Remove,
  AttachMoney,
  KeyboardDoubleArrowUp,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import styles from "./style.module.scss";
import { formatToBRL } from "../../utils/formatToBRL";
import { getDataStorage } from "../../data/getDataStorage";

export const cards = [
  {
    cardIcon: Add,
    iconClassname: styles.addIcon,
    value: getDataStorage()[0].length,
    text: "Transações de Entrada",
  },
  {
    cardIcon: Remove,
    iconClassname: styles.removeIcon,
    value: getDataStorage()[1].length,
    text: "Transações de Saída",
  },
  {
    cardIcon: KeyboardDoubleArrowUp,
    iconClassname: styles.arrowsIcon,
    value: formatToBRL(getDataStorage()[2]),
    text: "Subtotal de Entrada",
  },
  {
    cardIcon: KeyboardDoubleArrowDown,
    iconClassname: styles.arrowsIcon,
    value: formatToBRL(getDataStorage()[3]),
    text: "Subtotal de Saída",
  },
  {
    cardIcon: AttachMoney,
    iconClassname: styles.moneyIcon,
    value: formatToBRL(getDataStorage()[4]),
    text: "Subtotal da Conta",
  },
];
