import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const CkEditor = ({ name, control, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <CKEditor
          editor={ClassicEditor}
          data={field.value}
          onChange={(event, editor) => field.onChange(editor.getData())}
        />
      )}
    />
  );
};
