import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";

const ToastContainer = () => {
  const theme = useTheme();

  return (
    <ReactToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
      toastStyle={{
        background: theme.palette.background.default,
        color: theme.palette.secondary.main,
        width: "auto",
        minWidth: "300px",
        fontSize: "20px",
        fontWeight: "700",
        borderRadius: "8px",
        border: `6px solid ${theme.palette.secondary.main}`,
        padding: "10px",
        wordBreak: "break-word",
      }}
      progressStyle={{ backgroundColor: theme.palette.primary.main }}
      icon={false}
      limit={1}
    />
  );
};

export default ToastContainer;
