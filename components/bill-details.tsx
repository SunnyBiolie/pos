import { getCustomerById } from "@/action/get-customer-by-id";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customer, detail_receipt, receipt } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { getListDetailReceiptByReceiptId } from "@/action/get-list-detail-receipt-by-receipt-id";

interface BillDetailsProps {
  bill: receipt;
}

export const BillDetails = ({ bill }: BillDetailsProps) => {
  const [customer, setCustomer] = useState<customer | undefined>(undefined);
  const [detailReceiptList, setDetailReceiptList] = useState<
    detail_receipt[] | undefined
  >(undefined);

  useEffect(() => {
    const fetch1 = async () => {
      return await getCustomerById(bill.id_customer);
    };
    fetch1().then((data) => setCustomer(data!));
    const fetch2 = async () => {
      return await getListDetailReceiptByReceiptId(bill.id_receipt);
    };
    fetch2().then((data) => setDetailReceiptList(data!));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="px-4 py-5 flex flex-col gap-y-4">
      {customer && detailReceiptList ? (
        <>
          <div className="text-sm space-y-2 px-2">
            <p className="text-right text-neutral-300 font-medium flex justify-between pb-1">
              <span>ID: {bill.id_receipt}</span>
              <span>
                {bill.date_receipt.toLocaleDateString("en-EN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            <p>
              Customer: {customer?.name_customer} - {customer?.phone_customer}
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[110px]">Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-[100px]">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailReceiptList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.name_product}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.price_product}
                  </TableCell>
                  <TableCell className="italic text-center">
                    x{item.quantity_product}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.price_product * item.quantity_product}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right flex justify-between font-semibold px-2">
            <span>Total bill</span>
            <span>${bill.total_amount_receipt}</span>
          </div>
        </>
      ) : (
        <div className="w-[350px] h-[320px]">
          <Loading />
        </div>
      )}
    </div>
  );
};
