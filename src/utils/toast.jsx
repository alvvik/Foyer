import { toast } from "react-toastify";
const style = {
  className: `!rounded-lg ring-2 !ring-primary/80 !bg-background-sec  !text-text !shadow-lg`,
  bodyClassName: "!font-medium !text-sm",
};
export const InfoToast = ({ text = "Info" }) => {
  toast.info(text, style);
};
export const WarnToast = ({ text = "Warn!" }) => {
  toast.warning(text, style);
};
export const ErrorToast = ({ text = "Error!" }) => {
  toast.error(text, style);
};
export const SuccessToast = ({ text = "Succes!" }) => {
  toast.success(text, style);
};
