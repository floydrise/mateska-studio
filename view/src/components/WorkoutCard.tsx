import type { WorkoutCardType } from "../../../shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkoutCard = ({ workoutCard }: { workoutCard: WorkoutCardType }) => {
  return <div>{workoutCard.workoutCardTitle}</div>;
};

export default WorkoutCard;
