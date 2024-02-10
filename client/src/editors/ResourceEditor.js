import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import Checklist from '@editorjs/checklist';
import Warning from '@editorjs/warning';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import ToggleBlock from 'editorjs-toggle-block';
import Title from "title-editorjs";
import NestedList from '@editorjs/nested-list';
import AttachesTool from '@editorjs/attaches';
import Table from '@editorjs/table';
import AIText from '@alkhipce/editorjs-aitext';


const ResourceEditor = (data = []) => {
    return new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: "editorjs",
        tools: {
            header: Header,
            title: Title,
            quote: Quote, 
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
            },
            delimeter: Delimiter,
            list: {
                class: NestedList,
                inlineToolbar: true,
                config: {
                  defaultStyle: 'unordered'
                }
            },
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            toggle: {
              class: ToggleBlock,
              inlineToolbar: true,
            },
            table: Table,
            warning: Warning,
            alert: Alert,
            linkTool: {
                class: LinkTool,
                config: {
                    config: {
                        endpoint: 'http://localhost:5000/fetchUrl', // Backend endpoint for url data fetching,
                    }
                }
            },
            embed: Embed,
            image: {
                class: ImageTool,
                config: {
                  endpoints: {
                    byFile: 'http://localhost:5000/uploadFile', // Backend file uploader endpoint
                    byUrl: 'http://localhost:5000/fetchUrl', // Endpoint that provides uploading by Url
                  }
                }
            },
            attaches: {
              class: AttachesTool,
              config: {
                endpoint: 'http://localhost:8008/uploadFile'
              }
            },
            aiText: {
              class: AIText,
              config: {
                openaiKey: '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'
              }
          },
        },
        readOnly: false,
        style: {
          outerHeight: 0
        },
        data
      });
}
export default ResourceEditor