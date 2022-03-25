import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import s3Client from "../../utility/S3Client";
import axios from "../../axios";
import { S3_RESOURCE_URL } from "../../utility/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [uploadFile, setUploadFile] = useState({
    loading: false,
    error: "",
  });

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleSelectFile = ({ target: { files } }) => {
    setSelectedFile(files[0]);
  };

  const handleCloseFile = () => {
    setSelectedFile(null);
  };

  const handleUploadFile = async () => {
    const fileName = selectedFile.name.replace(/ /g, "_");

    const bucketParams = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: fileName,
      FilePath: selectedFile,
    };
    try {
      const data = await s3Client.send(new PutObjectCommand(bucketParams));
      if (data.$metadata.httpStatusCode === 200) {
        const body = {};
        if (password) {
          body.password = password;
          body.passwordEnabled = true;
        }
        body.path = `${S3_RESOURCE_URL + fileName}`;
        console.log("body", body);
        const res = await axios.post("/files", body);
        if (res.status === 200 && res.statusText === "OK" && res.data.success) {
          navigate("/myDocs");
        } else {
          throw new Error(
            "Something went wrong, please try again after sometime."
          );
        }
      } else {
        throw new Error(
          "Something went wrong, please try again after sometime."
        );
      }
    } catch (error) {
      console.log("handleUploadFile Error", error);
      setUploadFile((prev) => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const { loading, error } = uploadFile;

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
        Upload Documents
      </Typography>

      <input
        type="file"
        onChange={handleSelectFile}
        hidden
        id="icon-button-file"
      />
      <label htmlFor="icon-button-file">
        <Button
          component="span"
          variant="contained"
          sx={{
            fontSize: "22px",
            padding: "10px 40px",
            ":hover": {
              background: "#161616",
            },
          }}
        >
          Select file
          <CloudUploadIcon
            sx={{ ml: 2, mb: 0.4, height: "30px", width: "30px" }}
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
              mt: "20px",
            }}
          >
            <Typography
              component="h1"
              variant="subtitle1"
              align="center"
              color="text.primary"
              sx={{ m: 2, textDecoration: "underline" }}
            >
              {selectedFile.name}
            </Typography>
            <CloseIcon onClick={handleCloseFile} sx={{ cursor: "pointer" }} />
          </Box>

          <TextField
            name="password"
            id="password"
            label="Password protected (optional)"
            size="small"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ m: "10px 0 20px", width: "300px" }}
          />
          <Button
            variant="contained"
            onClick={handleUploadFile}
            sx={{
              fontSize: "16px",
              ":hover": {
                background: "#161616",
              },
            }}
          >
            Upload
          </Button>
        </>
      )}

      {/* <Typography
        component="h1"
        variant="subtitle1"
        align="center"
        color="text.primary"
        sx={{ m: 2 }}
      >
        or drag file here
      </Typography> */}
    </Box>
  );
};

export default Dashboard;
