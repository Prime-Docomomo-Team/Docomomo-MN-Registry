import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

function DatabaseTable() {
  const sites = useSelector((store) => store.sites);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box component='div' sx={{margin: 2}}>
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead >
            <TableRow>
              <TableCell>Site ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Architect</TableCell>
              <TableCell align="right">Year Built</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((site) => (
              <TableRow
                key={site.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {site.id}
                </TableCell>
                <TableCell align="right">{site.site_name}</TableCell>
                <TableCell align="right">{site.city}</TableCell>
                <TableCell align="right">{site.state}</TableCell>
                <TableCell align="right">{site.architect}</TableCell>
                <TableCell align="right">{site.year_built}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={sites.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default DatabaseTable;
