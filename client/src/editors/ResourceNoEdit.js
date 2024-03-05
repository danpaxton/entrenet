import { Editor } from '@tinymce/tinymce-react';

const ResourceNoEdit = ({ resource }) => {
  return (
    <>
      <Editor
        apiKey="j5j03cv3b4fs3ehd53fcxgds9xrm7ntj9k00hac9qwjpuz6h"
        value={resource.data}
        disabled={true}
        init={{
            menubar: false,
            toolbar: false,
            statusbar: false,
            noneditable_class: 'uneditable',
        }}
      />
    </>
  );
}
export default ResourceNoEdit