import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

interface Props {
  title: string;
  content: string;
}

const ToastViewer = ({ title, content }: Props) => {
  return <Viewer initialValue={content} />;
};

export default ToastViewer;
