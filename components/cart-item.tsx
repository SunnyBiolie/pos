"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Trash2 } from "lucide-react";
import { QuantitySelection } from "@/components/quantity-selection";
import { type ProductInBill } from "@/schema";

interface CardItemProps {
  product: ProductInBill;
  prosInCard: ProductInBill[];
  setProsInCard: Dispatch<SetStateAction<ProductInBill[]>>;
}

export const CardItem = ({
  product,
  prosInCard,
  setProsInCard,
}: CardItemProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);

  useEffect(() => {
    const index = prosInCard.findIndex(
      (pro) => pro.productId === product.productId
    );

    prosInCard[index].quantity = quantity;
    setProsInCard([...prosInCard]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const onDelete = () => {
    const deleteIndex = prosInCard.findIndex(
      (pro) => pro.productId === product.productId
    );
    setProsInCard(prosInCard.toSpliced(deleteIndex, 1));
  };

  return (
    <div className="flex items-center gap-x-4 hover:bg-neutral-800 py-2 px-3">
      <div className="flex-1 flex flex-col">
        <span>{product.productName}</span>
        <span className="text-xs text-[#6f91eb]">
          Price ${product.productPrice}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-x-4 select-none">
        <QuantitySelection quantity={quantity} setQuantity={setQuantity} />
        <div className="flex-1 text-center">
          ${quantity * product.productPrice}
        </div>
        <div className="rounded-full p-1  cursor-pointer" onClick={onDelete}>
          <Trash2 className="size-5 text-[#ff7a7e]" />
        </div>
      </div>
    </div>
  );
};
