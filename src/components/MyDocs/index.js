import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import axios from "../../axios";
import DeleteModal from "../DeleteModal";
import PasswordProtectedModal from "../PasswordProtectedModal";
import ShareFileModal from "../ShareFileModal";

const emailRegex = /\S+@\S+\.\S+/;

const MyDocs = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [passwordProtectedModal, setPasswordProtectedModal] = useState(false);
  const [shareFileModal, setShareFileModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [shareFileSuccess, setShareFileSuccess] = useState("");
  const [deleteFileSuccess, setDeleteFileSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [documents, setDocuments] = useState({
    loading: false,
    error: "",
    data: [],
  });

  useEffect(() => {
    getUsersDocuments();
  }, []);

  const toggleDeleteModal = () => {
    setDeleteModal((prev) => !prev);
  };

  const togglePasswordProtectedModal = () => {
    setPasswordProtectedModal((prev) => !prev);
  };

  const toggleShareFileModal = () => {
    setShareFileModal((prev) => !prev);
  };

  const handleDeleteIconClick = (id) => () => {
    setSelectedId(id);
    toggleDeleteModal();
  };

  const handleShareDocIconClick = (id) => () => {
    setSelectedId(id);
    toggleShareFileModal();
  };

  const handleDownloadFileClick = (file) => () => {
    setSelectedFile(file);
    togglePasswordProtectedModal();
  };

  const handleDeleteFile = async () => {
    try {
      const res = await axios.post("/files/delete", { fileId: selectedId });
      if (res.status === 200 && res.data.success) {
        setDocuments((prev) => ({
          ...prev,
          data: prev.data.filter((d) => d.id.S !== selectedId),
        }));
        setDeleteFileSuccess("File has been deleted successfully.");
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("handleDeleteFile Error", error);
      setDocuments((prev) => ({ ...prev, error: error.message }));
    } finally {
      setSelectedId("");
      toggleDeleteModal();
    }
  };

  const handleDownloadFile = async () => {
    if (selectedFile.password.S && !password) {
      return setPasswordError("Please provide password.");
    }
    setPasswordError("");
    try {
      const res = await axios.post("/files/download", {
        fileId: selectedFile.id.S,
        password,
      });
      if (res.status === 200 && res.data.success) {
        setDocuments((prev) => ({ ...prev, error: "" }));
        saveAs(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("handleDownloadFile Error", error);
      setDocuments((prev) => ({ ...prev, error: error.message }));
    } finally {
      setPassword("");
      setSelectedFile(null);
      togglePasswordProtectedModal();
    }
  };

  const handleShareFile = async () => {
    if (!email || !emailRegex.test(email)) {
      return setEmailError("Please provide valid email address.");
    }
    setEmailError("");
    try {
      const res = await axios.post("/members", {
        fileId: selectedId,
        users: [email],
      });
      if (res.status === 200 && res.data.success) {
        setShareFileSuccess("File has been shared successfully.");
      }
    } catch (error) {
      console.log("handleShareFile Error", error);
      setDocuments((prev) => ({ ...prev, error: error.message }));
    } finally {
      setEmail("");
      setSelectedId("");
      toggleShareFileModal();
    }
  };

  const getUsersDocuments = async () => {
    try {
      setDocuments((prev) => ({ ...prev, loading: true }));
      const res = await axios.get("/files");
      if (
        res.status === 200 &&
        res.data.data.$metadata.httpStatusCode === 200
      ) {
        setDocuments((prev) => ({
          ...prev,
          data: res.data.data.Items,
        }));
      } else {
        throw new Error(
          "Something went wrong, please try again after sometime."
        );
      }
    } catch (error) {
      console.log("getUsersDocuments Error", error);
      setDocuments((prev) => ({
        ...prev,
        error: error.message,
      }));
    } finally {
      setDocuments((prev) => ({ ...prev, loading: false }));
    }
  };

  const { loading, error, data: documentsData } = documents;

  if (loading) {
    return (
      <Box
        component="main"
        sx={{
          display: "flex",
          height: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          size={40}
          sx={{
            color: (theme) => theme.palette.primary.main,
            textAlign: "center",
          }}
        />
      </Box>
    );
  }

  return (
    <>
      <ShareFileModal
        emailError={emailError}
        email={email}
        setEmail={setEmail}
        open={shareFileModal}
        handleClose={toggleShareFileModal}
        handleShareFile={handleShareFile}
      />
      <DeleteModal
        open={deleteModal}
        handleClose={toggleDeleteModal}
        handleDeleteFile={handleDeleteFile}
        type="delete"
      />
      <PasswordProtectedModal
        passwordError={passwordError}
        selectedFile={selectedFile}
        password={password}
        setPassword={setPassword}
        open={passwordProtectedModal}
        handleClose={togglePasswordProtectedModal}
        handleDownloadFile={handleDownloadFile}
      />
      {(shareFileSuccess || deleteFileSuccess) && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {shareFileSuccess || deleteFileSuccess}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Document Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!documentsData.length ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="document"
                  colSpan={5}
                  align="center"
                >
                  No Files Found
                </TableCell>
              </TableRow>
            ) : (
              documentsData.map((document) => (
                <TableRow
                  key={document.id.S}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="document">
                    <Link onClick={handleDownloadFileClick(document)}>
                      {document.fileName.S}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {document.fileType.S.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">{document.fileSize.S}</TableCell>
                  <TableCell align="center">
                    {new Date(document.created.S).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <ShareRoundedIcon
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        mr: 2,
                        cursor: "pointer",
                      }}
                      onClick={handleShareDocIconClick(document.id.S)}
                    />
                    <DeleteForeverRoundedIcon
                      sx={{
                        color: (theme) => theme.palette.error.main,
                        cursor: "pointer",
                      }}
                      onClick={handleDeleteIconClick(document.id.S)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyDocs;
