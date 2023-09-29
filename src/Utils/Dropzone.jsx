import { useState } from "react";
import { React, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ files, setFiles }) {
  // const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  // Using the onDrop hook from the raect-dropzone so once user drops a file it gets executed immediately
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const selectedImages = files?.map((file) => (
    <div className="preview">
      <img src={file.preview} style={{ width: "200px" }} alt="" />
    </div>
  ));

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop the files here ...</p>
      </div>
      {files && selectedImages}
    </>
  );
}

export default Dropzone;
