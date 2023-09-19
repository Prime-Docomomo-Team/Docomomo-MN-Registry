import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const Filters = () => {
  const dispatch = useDispatch();
  const { sitesColumns, filterInputs } = useSelector((store) => store);

  // const [filterInputs, setFilterInputs] = useState({});

  useEffect(() => {
    dispatch({ type: "FETCH_SITES_COLUMNS" });
    applyFilters();
  }, []);

  const applyFilters = () => {
    const payload = [];
    for (const key in filterInputs) {
      payload.push({ field: key, input: filterInputs[key] });
    }
    console.log("payload", payload);
    dispatch({
      type: "FETCH_FILTERED_SITES",
      payload,
    });
  };

  const clearFilters = () => {
    dispatch({ type: "SET_FILTER_INPUTS", payload: {} });
    dispatch({ type: "FETCH_ALL_SITES" });
  };

  return (
    <div>
      <Grid container spacing={2}>
        {sitesColumns
          .filter(
            (column) =>
              !["id", "latitude", "longitude", "description"].includes(
                column.column_name
              )
          )
          .map((column) => (
            <Grid item xs={3}>
              <TextField
                variant="standard"
                key={column.ordinal_position}
                label={column.column_name.replace("_", " ")}
                value={filterInputs[column.column_name] || ""}
                onChange={(event) =>
                  dispatch({
                    type: "SET_FILTER_INPUTS",
                    payload: {
                      ...filterInputs,
                      [[column.column_name]]: event.target.value,
                    },
                  })
                }
              />
            </Grid>
          ))}
      </Grid>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          my: 2,
        }}
      >
        <Button variant="contained" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Container>
    </div>
  );
};

export default Filters;
