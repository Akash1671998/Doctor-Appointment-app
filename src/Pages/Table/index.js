import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TablePagination,
  Box,
  IconButton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { application } from "../../authentication/auth";

const CustomTable = ({
  title,
  apiUrl,
  columns,
  searchEnable,
  filterEnable,
  updateList,
  onSearchChange,
  dynamicSearch = false,
}) => {
  const [data, setData] = useState([]);
  const [localSearch, setLocalSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = () => {
    application
      .get(apiUrl)
      .then((response) => {
        setData(response.data.data || []);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, updateList]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (dynamicSearch) {
      onSearchChange?.(value);
    } else {
      setLocalSearch(value.toLowerCase());
    }
  };

  const filteredData = !dynamicSearch
    ? data.filter((item) =>
        columns.some((col) =>
          item[col.field]?.toString().toLowerCase().includes(localSearch)
        )
      )
    : data;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleTuneClick() {
    alert("Filter clicked");
  }

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 3,
        mt: 4,
        width: "97%",
        mx: "auto",
        borderRadius: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#f9fafe",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#0d47a1", fontWeight: "bold" }}
      >
        {title}
      </Typography>

      {/* Search and Filter Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {searchEnable && (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name, email..."
            onChange={handleSearchChange}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
        )}

        {filterEnable && (
          <IconButton
            onClick={handleTuneClick}
            sx={{
              backgroundColor: "#e3f2fd",
              borderRadius: "50%",
              width: 50,
              height: 50,
              color: "#1976d2",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
            }}
          >
            <TuneIcon sx={{ fontSize: 28 }} />
          </IconButton>
        )}
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row._id || index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f1f8ff",
                    },
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      sx={{ fontSize: 15, fontWeight: 500 }}
                    >
                      {col.renderCell
                        ? col.renderCell({ row })
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          ".MuiTablePagination-root": {
            color: "#1976d2",
            fontWeight: "bold",
          },
        }}
      />
    </Paper>
  );
};

export default CustomTable;
