import { useState } from "react";
import { useMemo } from "react";
import { React, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ files, setFiles }) {
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "grey",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const preview = {
    flex: 1,
    display: "flex",
    marginTop: "10px",
  };

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
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: "image/*" });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const selectedImages = files?.map((file) => (
    <div className="preview" style={preview}>
      <img src={file.preview} style={{ width: "100px" }} alt="" />
    </div>
  ));

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drop the Images here ...</p>
      </div>
      {files && selectedImages}
    </>
  );
}

export default Dropzone;
