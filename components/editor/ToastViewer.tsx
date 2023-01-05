import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const ToastViewer = () => {
  const value = "# hello \n -  A\n -  B \n ### bye \n 1. A \n 2. B";
  return <Viewer initialValue={value} />;
};

export default ToastViewer;
