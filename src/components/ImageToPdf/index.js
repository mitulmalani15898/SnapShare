import { useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TransformIcon from "@mui/icons-material/Transform";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import s3Client from "../../utility/S3Client";
import axios from "../../axios";
import { S3_RESOURCE_URL } from "../../utility/constants";

const acceptedFileFormats = ["image/jpeg", "image/jpg", "image/png"];

const ImageToPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertFile, setConvertFile] = useState({
    loading: false,
    error: "",
  });

  const handleSelectFile = ({ target: { files } }) => {
    setSelectedFile(files[0]);
  };

  const handleCloseFile = () => {
    setSelectedFile(null);
    setConvertFile({ loading: false, error: "" });
  };

  const handleUploadFile = async () => {
    if (!acceptedFileFormats.includes(selectedFile.type)) {
      return setConvertFile((prev) => ({
        ...prev,
        error: "Only JPEG, JPG, and PNG are allowed.",
      }));
    }
    setConvertFile((prev) => ({ ...prev, error: "" }));
  };

  const { loading, error } = convertFile;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 1,
        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
        borderRadius: "8px",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Convert Image to PDF
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <input
        type="file"
        onChange={handleSelectFile}
        hidden
        accept="image/jpeg, image/png"
        id="icon-button-file"
      />
      <label htmlFor="icon-button-file">
        <Button
          component="span"
          variant="contained"
          sx={{
            fontSize: "22px",
            padding: "10px 20px",
            ":hover": {
              background: "#161616",
            },
          }}
        >
          Convert
          <TransformIcon
            sx={{ ml: 1, mb: 0.4, height: "30px", width: "30px" }}
          />
        </Button>
      </label>
      {!!selectedFile && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "10px",
            }}
          >
            <Typography
              component="h1"
              variant="subtitle1"
              align="center"
              color="text.primary"
              sx={{ m: 2 }}
            >
              {selectedFile.name}
            </Typography>
            <CloseIcon onClick={handleCloseFile} sx={{ cursor: "pointer" }} />
          </Box>

          <Button
            variant="contained"
            onClick={handleUploadFile}
            sx={{
              fontSize: "16px",
              minWidth: "100px",
              ":hover": {
                background: "#161616",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={28}
                sx={{ color: (theme) => theme.palette.common.white }}
              />
            ) : (
              "Upload"
            )}
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageToPdf;
