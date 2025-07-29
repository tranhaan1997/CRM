import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button, LinearProgress, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const FileUploadDropzone = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileList, setFileList] = useState([]);
  console.log("🚀 ~ FileUploadDropzone ~ fileList:", fileList);

  const addFile = (file) => {
    console.log("🚀 ~ addFile ~ file:", file);
    setFileList((prev) => [...prev, file]); // tạo mảng mới
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("I_DOCFILE_CODE", "CODE123");
    formData.append("I_CUST_ID", 1);
    formData.append("I_CONT_ID", 2);
    formData.append("I_DOCFILE_CONTENT", "nội dung mô tả");
    formData.append("I_DOCFILE_NOTE", "ghi chú");

    axios
      .post("https://ams.vienthongact.vn:50002/Api/Files/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      })
      .then((res) => {
        // console.log("🚀 ~ .then ~ res:", res);

        setMessage("✅ Upload thành công");
        setUploadProgress(0);
        if (res?.data?.O_CUSTOM) {
          addFile(res.data.O_CUSTOM);
        }
      })
      .catch((err) => {
        setMessage("❌ Upload lỗi: " + (err.response?.data || err.message));
        setUploadProgress(0);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          textAlign: "center",
          borderStyle: "dashed",
          borderColor: isDragActive ? "primary.main" : "grey.400",
          bgcolor: isDragActive ? "grey.100" : "inherit",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 50, color: "primary.main" }} />
        <Typography variant="h6" mt={2}>
          {isDragActive
            ? "Thả file tại đây..."
            : "Kéo & thả file vào đây hoặc bấm để chọn"}
        </Typography>

        {uploadProgress > 0 && (
          <Box mt={2}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" mt={1}>
              {uploadProgress}%
            </Typography>
          </Box>
        )}

        {message && (
          <Typography variant="body2" mt={2} color="text.secondary">
            {message}
          </Typography>
        )}
      </Paper>

      <Box>
        File List Upload:
        <ul>
          {fileList.length > 0 &&
            fileList.map((item, index) => (
              <li key={index}>
                Xem file:
                <a
                  href={item.MsPublicLink ? item.MsPublicLink : item.PublicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.FileName}: {item.FileSize} KB;
                </a>
              </li>
            ))}
        </ul>
      </Box>
    </>
  );
};

export default FileUploadDropzone;
