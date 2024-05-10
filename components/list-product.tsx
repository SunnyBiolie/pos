import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { ProductItem, SkeletonProductItem } from "@/components/product-item";
import { getListProductByShopId } from "@/action/get-list-product-by-shop-id";
import { product } from "@prisma/client";
import { type ProductInBill } from "@/schema";
import { useDBUser } from "@/hooks/use-user";

interface ListProductProps {
  prosInCard: ProductInBill[];
  setProsInCard: Dispatch<SetStateAction<ProductInBill[]>>;
}

export const ListProduct = ({
  prosInCard,
  setProsInCard,
}: ListProductProps) => {
  const userDB = useDBUser();

  const [listProduct, setListProduct] = useState<product[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (userDB.user) {
      const fetch = async () => {
        return await getListProductByShopId(userDB.user!.id_shop);
      };
      fetch().then((data) => setListProduct(data));
    }
    // eslint-disable-next-line
  }, []);

  if (listProduct) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {listProduct.map((product, index) => (
          <ProductItem
            key={index}
            product={product}
            prosInCard={prosInCard}
            setProsInCard={setProsInCard}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <SkeletonProductItem />
      <SkeletonProductItem />
      <SkeletonProductItem />
      <SkeletonProductItem />
      <SkeletonProductItem />
      <SkeletonProductItem />
      <SkeletonProductItem />
    </div>
  );
};
