import { cn } from "@/lib/utils";
import { type ProductInBill } from "@/schema";
import { product } from "@prisma/client";
import { type Dispatch, type SetStateAction } from "react";
import { Skeleton } from "./ui/skeleton";

interface ProductProps {
  product: product;
  prosInCard: ProductInBill[];
  setProsInCard: Dispatch<SetStateAction<ProductInBill[]>>;
}

export const ProductItem = ({
  product,
  prosInCard,
  setProsInCard,
}: ProductProps) => {
  const isInCard = prosInCard.find(
    (pro) => pro.productId === product.id_product
  )
    ? true
    : false;

  const onClick = () => {
    if (isInCard) {
      console.log("Đã tồn tại");
      return;
    }

    const newProInCard: ProductInBill = {
      productId: product.id_product,
      productName: product.name_product,
      productPrice: product.price_product,
      quantity: 1,
    };

    prosInCard.push(newProInCard);
    setProsInCard([...prosInCard]);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-y-1 px-2 py-3 rounded-md bg-neutral-200 text-[#232425] cursor-pointer",
        isInCard && "bg-[#604be8] text-white cursor-default"
      )}
      onClick={onClick}
    >
      <span className="font-medium text-center">{product.name_product}</span>
      <span className="text-sm">${product.price_product}</span>
    </div>
  );
};

export function SkeletonProductItem() {
  return <Skeleton className="w-full h-[72px]"></Skeleton>;
}
