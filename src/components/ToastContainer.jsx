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
        minWidth: "400px",
        fontSize: "2px",
        fontWeight: "700",
        borderRadius: "10px",
        border: `8px solid ${theme.palette.secondary.main}`,
        padding: "10px",
        wordWrap: "break-word",
      }}
      progressStyle={{ background: theme.palette }}
      icon={false}
      limit={1}
    />
  );
};

export default ToastContainer;
