import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import axios from "../../axios";

const MyDocs = () => {
  const [documents, setDocuments] = useState({
    loading: false,
    error: "",
    data: [],
  });

  useEffect(() => {
    getUsersDocuments();
  }, []);

  const getUsersDocuments = async () => {
    try {
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
    }
  };

  const { loading, error, data: documentsData } = documents;

  // console.log("documents", documents);

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
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
            {/* {documentsData.map((document) => (
            <TableRow
              key={document.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="document">
                {document.name}
              </TableCell>
              <TableCell align="center">{document.calories}</TableCell>
              <TableCell align="center">{document.fat}</TableCell>
              <TableCell align="center">{document.carbs}</TableCell>
              <TableCell align="center">
                <ShareRoundedIcon
                  sx={{ color: (theme) => theme.palette.primary.main, mr: 2 }}
                />
                <DeleteForeverRoundedIcon
                  sx={{ color: (theme) => theme.palette.error.main }}
                />
              </TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyDocs;
