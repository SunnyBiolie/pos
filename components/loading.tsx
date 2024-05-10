import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <AiOutlineLoading3Quarters className="size-6 animate-spin" />
    </div>
  );
};
