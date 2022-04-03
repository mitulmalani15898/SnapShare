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

import axios from "../../axios";
import DeleteModal from "../DeleteModal";
import { Link } from "@mui/material";
import PasswordProtectedModal from "../PasswordProtectedModal";

const MyDocs = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [passwordProtectedModal, setPasswordProtectedModal] = useState(false);
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

  const handleDeleteIconClick = (id) => () => {
    toggleDeleteModal();
    setSelectedId(id);
  };

  const handleDeleteFile = async () => {
    try {
      const res = await axios.post("/files/delete", { fileId: selectedId });
      if (res.status === 200 && res.statusText === "OK" && res.data.success) {
        setDocuments((prev) => ({
          ...prev,
          data: prev.data.filter((d) => d.id.S !== selectedId),
        }));
      }
    } catch (error) {
      console.log("handleDeleteFile Error", error);
      setDocuments((prev) => ({ ...prev, error: error.message }));
    } finally {
      toggleDeleteModal();
    }
  };

  const handleDownloadFileClick = (file) => () => {
    setSelectedFile(file);
    togglePasswordProtectedModal();
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
      if (res.status === 200 && res.statusText === "OK" && res.data.success) {
        saveAs(res.data.data);
      }
    } catch (error) {
      console.log("handleDownloadFile Error", error);
      setDocuments((prev) => ({ ...prev, error: error.message }));
    } finally {
      togglePasswordProtectedModal();
    }
  };

  const getUsersDocuments = async () => {
    try {
      setDocuments((prev) => ({ ...prev, loading: true }));
      const res = await axios.get("/files");
      if (
        res.status === 200 &&
        res.statusText === "OK" &&
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
      <DeleteModal
        open={deleteModal}
        handleClose={toggleDeleteModal}
        handleDeleteFile={handleDeleteFile}
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
              <TableCell align="center">Document Type</TableCell>
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
