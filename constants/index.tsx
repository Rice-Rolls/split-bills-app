import {
  CarOutlined,
  ShoppingOutlined,
  CoffeeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { ExpenseType } from "types";

export const expenseTypeList: ExpenseType[] = [
  {
    type: "eating",
    text: "餐饮",
    icon: <CoffeeOutlined />,
  },
  {
    type: "taxi",
    text: "打车",
    icon: <CarOutlined />,
  },
  {
    type: "shop",
    text: "购物",
    icon: <ShoppingOutlined />,
  },
  {
    type: "snacks",
    text: "零食",
    icon: <ShopOutlined />,
  },
];