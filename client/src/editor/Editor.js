import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';

const Editor = data => {
    return new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'editorjs',
        tools: {
            header: Header,
            list: List,
            raw: RawTool,
            embed: Embed,
            quote: Quote,
            image: {
                class: ImageTool,
                config: {
                  endpoints: {
                    byFile: 'http://localhost:5000/uploadFile', // Backend file uploader endpoint
                    byUrl: 'http://localhost:5000/fetchUrl', // Endpoint that provides uploading by Url
                  }
                }
            },
            linkTool: {
                class: LinkTool,
                config: {
                    config: {
                        endpoint: 'http://localhost:5000/fetchUrl', // Backend endpoint for url data fetching,
                    }
                }
            },
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
        },
        data
      });
}
export default Editor