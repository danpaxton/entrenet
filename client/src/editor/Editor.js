import EditorJS from "@editorjs/editorjs";
import { Box } from "@mui/material";

const Editor = () => {
    const editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'editorjs',
      });

    return (
        <Box id="editorjs"/>
    )
}
export default Editor