import { toast } from "react-toastify";
export const SuccesToast = ({ text = "Succes!" }) => {
  toast.success(text, {
    className: "rounded-lg border border-primary shadow-lg",
    bodyClassName: "font-medium text-sm",
  });
};
