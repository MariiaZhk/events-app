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
        maxWidth: "500px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "30px",
        border: `4px solid ${theme.palette.secondary}`,
        padding: "10px",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
      }}
      progressStyle={{ background: theme.palette.secondary }}
      icon={false}
      limit={1}
    />
  );
};

export default ToastContainer;
