import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { Editor } from '@tinymce/tinymce-react';

import { api } from '../App';

const ResourceEditor = ({ setSaved, resource }) => {
  const [text, setText] = useState("");

  const saveResource = async (text) => {
    try {
      await api.post('/resource/update', { title: resource.title, data: text } );
      setSaved(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (newValue, editor) => {
    setSaved(false);
    setText(newValue);
  };

  useAutosave({ data: text || resource.data, onSave: saveResource});

  return (
    <>
      <Editor
        apiKey="j5j03cv3b4fs3ehd53fcxgds9xrm7ntj9k00hac9qwjpuz6h"
        onEditorChange={handleChange}
        value={text || resource.data}
        init={{
            plugins: 'preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable charmap quickbars emoticons',
            imagetools_cors_hosts: ['picsum.photos'],
            menubar: 'edit view insert format tools table help',
            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            statusbar: false,
            image_advtab: true,
            importcss_append: true,
            noneditable_class: 'uneditable',
            templates: [
                  { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
              { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
              { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
            ],
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            image_caption: true,
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image imagetools table',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
}
export default ResourceEditor