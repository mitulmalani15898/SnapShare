import { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash.isempty";

import axios from "../../axios";
import { AccountContext } from "../../AccountProvider";

const acceptedFileFormats = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { secrets, getSession, getS3Client } = useContext(AccountContext);

  const [userPlan, setUserPlan] = useState("");
  const [userDocs, setUserDocs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [uploadFile, setUploadFile] = useState({
    loading: false,
    error: "",
  });

  useEffect(() => {
    getUserDocs();
  }, []);

  useEffect(() => {
    if (!isEmpty(secrets)) {
      getSession().then((data) => setUserPlan(data["custom:subscriptionPlan"]));
    }
  }, [secrets]);

  const getUserDocs = async () => {
    const res = await axios.get("/files");
    if (res.status === 200 && res.data.success) {
      setUserDocs(res.data.data.Items);
    } else {
      setUserDocs([]);
    }
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleSelectFile = ({ target: { files } }) => {
    setSelectedFile(files[0]);
  };

  const handleCloseFile = () => {
    setSelectedFile(null);
    setUploadFile({ loading: false, error: "" });
  };

  const handleUploadFile = async () => {
    if (!acceptedFileFormats.includes(selectedFile.type)) {
      return setUploadFile((prev) => ({
        ...prev,
        error: "Only PDF, JPEG, JPG, and PNG are allowed.",
      }));
    }
    const modifiedFile = selectedFile.name.replace(/ /g, "_");
    const fileSize = (selectedFile.size / (1024 * 1024)).toFixed(3);
    const lastIndexOfDot = modifiedFile.lastIndexOf(".");
    const fileName = modifiedFile.slice(0, lastIndexOfDot);
    const fileType = modifiedFile.slice(lastIndexOfDot + 1);

    if (userPlan === "standard" && fileSize > 1) {
      return setUploadFile((prev) => ({
        ...prev,
        error: "With Standard plan, max file size is 1 MB for uploading file.",
      }));
    }
    if (userPlan === "standard" && userDocs.length === 5) {
      return setUploadFile((prev) => ({
        ...prev,
        error: "With Standard plan, you can upload upto 5 documents.",
      }));
    }

    setUploadFile((prev) => ({ ...prev, error: "" }));

    const bucketParams = {
      Bucket: secrets.S3_BUCKET_NAME,
      Key: modifiedFile,
      Body: selectedFile,
    };

    try {
      setUploadFile((prev) => ({ ...prev, loading: true }));
      const s3Client = getS3Client();
      const data = await s3Client.send(new PutObjectCommand(bucketParams));
      if (data.$metadata.httpStatusCode === 200) {
        const body = {
          path: `${secrets.S3_RESOURCE_URL + modifiedFile}`,
          fileName,
          fileSize: `${fileSize} MB`,
          fileType,
        };
        if (password) {
          body.password = password;
          body.passwordEnabled = true;
        }
        const res = await axios.post("/files", body);
        if (res.status === 200 && res.data.success) {
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
      setSelectedFile(null);
    } finally {
      setUploadFile((prev) => ({ ...prev, loading: false }));
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <input
        type="file"
        onChange={handleSelectFile}
        hidden
        accept="application/pdf, image/jpeg, image/png"
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
              sx={{ m: 2 }}
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
