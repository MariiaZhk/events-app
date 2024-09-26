import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";

const ToastContainer = () => {
  const theme = useTheme();

  const customToastContent = (message) => (
    <div style={{ color: theme.palette.secondary }}>{message}</div>
  );

  return (
    <ReactToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
      render={(message) => customToastContent(message)}
      toastStyle={{
        background: theme.palette.secondary,
        color: theme.palette.secondary,
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
