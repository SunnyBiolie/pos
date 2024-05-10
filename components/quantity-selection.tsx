"use client";

import { type Dispatch, type SetStateAction } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";

interface QuantitySelectionProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export const QuantitySelection = ({
  quantity,
  setQuantity,
}: QuantitySelectionProps) => {
  const changeQuantity = (val: number) => {
    if (quantity + val <= 0 || quantity + val >= 10) return;
    setQuantity((prev) => prev + val);
  };

  return (
    <div className="bg-[#604be8] rounded-lg flex items-center justify-center shadow-md overflow-hidden transition">
      <div
        className="size-8 cursor-pointer hover:bg-[#6f91eb] flex items-center justify-center"
        onClick={() => changeQuantity(-1)}
      >
        <TiMinus className="size-3" />
      </div>
      <div className="size-8 flex items-center justify-center text-sm font-medium">
        {quantity}
      </div>
      <div
        className="size-8 cursor-pointer hover:bg-[#6f91eb] flex items-center justify-center"
        onClick={() => changeQuantity(1)}
      >
        <TiPlus className="size-3" />
      </div>
    </div>
  );
};
