import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

const PostEditor = ({ content = "", editorRef }: Props) => {
  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ""}
          initialEditType="markdown"
          height="420px"
          useCommandShortcut={true}
        />
      )}
    </>
  );
};

export default PostEditor;
