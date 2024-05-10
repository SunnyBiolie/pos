import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customer } from "@prisma/client";
import { getListCustomerByShopId } from "@/action/get-list-customer-by-shop-id";
import { useDBUser } from "@/hooks/use-user";

interface CustomerSelectionProps {
  setCustomer: Dispatch<SetStateAction<string | null>>;
}

export const CustomerSelection = ({ setCustomer }: CustomerSelectionProps) => {
  const userDB = useDBUser();

  const [listCustomer, setListCustomer] = useState<customer[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (userDB.user) {
      const fetch = async () => {
        return await getListCustomerByShopId(userDB.user!.id_shop);
      };
      fetch().then((data) => setListCustomer(data));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-4">
      <Select onValueChange={(value) => setCustomer(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose customer" />
        </SelectTrigger>
        <SelectContent>
          {listCustomer?.map((cus, index) => (
            <SelectItem key={index} value={cus.id_customer.toString()}>
              {cus.name_customer}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
