import type { WorkoutCardType } from "../../../shared/types";

const WorkoutCard = ({ workoutCard }: { workoutCard: WorkoutCardType }) => {
  return <div>{workoutCard.workoutCardTitle}</div>;
};

export default WorkoutCard;
