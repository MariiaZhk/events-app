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
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        width: "auto",
        minWidth: "600px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "10px",
        border: `4px solid ${theme.palette.primary.main}`,
        padding: "10px",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
      }}
      progressStyle={{ background: theme.palette.secondary.main }}
      icon={false}
      limit={1}
    />
  );
};

export default ToastContainer;
