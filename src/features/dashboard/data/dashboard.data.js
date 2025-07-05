import { ArrowDown, ArrowUp } from "lucide-react";

export const getCardData = ({ totalUsers = 0, newUsersToday = 0 }) => [
  {
    titile: "Total Users",
    heading: totalUsers.toLocaleString(),
    greentext: "12% from last month",
    coloricon: ArrowUp,
  },
  {
    titile: "New Today",
    heading: newUsersToday.toString(),
    greentext: "8% from yesterday",
    coloricon: ArrowUp,
  },
  // {
  //   titile: "Total Referrals",
  //   heading: "872",
  //   greentext: "24% from last month",
  //   coloricon: ArrowUp,
  // },
  // {
  //   titile: "Blocked Users",
  //   heading: "23",
  //   greentext: "3% from last month",
  //   coloricon: ArrowDown,

  //   color: "text-red-600",
  // },
];
