import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IOverviewCardProps {
  title: string;
  value: string;
  stats: string;
}
const OverviewCard: FC<IOverviewCardProps> = (props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="text-xs text-muted-foreground">
          {props.stats || "not Available"}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
