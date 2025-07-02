import { use } from "react";
import type { PatchCardType } from "../../../shared/types";

export const EditCardForm = ({
  cardInfoPromise,
}: {
  cardInfoPromise: Promise<{ card: PatchCardType }>;
}) => {
  const cardInfo = use(cardInfoPromise);
  console.log(cardInfo);
  return <div>Карта</div>;
};
