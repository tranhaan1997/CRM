import React, { useState } from "react";
import axios from "axios";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Vui lòng chọn file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // tên key phải trùng bên ASP.NET (ở đây là "file")
    formData.append("I_DOCFILE_CODE", "sample string 1");
    formData.append("I_CUST_ID", 1);
    formData.append("I_CONT_ID", 3);
    formData.append("I_DOCFILE_CONTENT", "sample string 4");
    formData.append("I_DOCFILE_NOTE", "sample string 5");
    try {
      const response = await axios.post(
        "https://ams.vienthongact.vn:50002/Api/Files/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        }
      );

      setMessage("✅ Upload thành công: " + response.data);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload thất bại");
    }
  };
  return (
    <div>
      <h3>Upload file lên Máy chủ</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {progress > 0 && <p>Tiến trình: {progress}%</p>}

      <p>{message}</p>
    </div>
  );
}

export default FileUploader;
