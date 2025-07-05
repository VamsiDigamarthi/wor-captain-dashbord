import { ArrowUp } from "lucide-react";

export const verificationPaymentIssue = ({ issueCount = 0 }) => [
  {
    titile: "Total payment Issue",
    heading: issueCount.toLocaleString(),
    greentext: "12% from last month",
    coloricon: ArrowUp,
  },
  {
    titile: "New Today",
    heading: issueCount.toLocaleString(),
    greentext: "12% from last month",
    coloricon: ArrowUp,
  },
  {
    titile: "Completed",
    heading: issueCount.toLocaleString(),
    greentext: "12% from last month",
    coloricon: ArrowUp,
  },
  {
    titile: "Pending",
    heading: issueCount.toLocaleString(),
    greentext: "12% from last month",
    coloricon: ArrowUp,
  },
];
