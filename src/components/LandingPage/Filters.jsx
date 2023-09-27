import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

// States

const states = [
  { value: "mn", label: "Minnesota" },
  { value: "nd", label: "North Dakota" },
  { value: "sd", label: "South Dakota" },
  { value: "ia", label: "Iowa" },
  { value: "wi", label: "Wisconsin" },
  { value: "il", label: "Illinois" },
  { value: "mo", label: "Missouri" },
  { value: "in", label: "Indiana" },
  { value: "", label: "clear filter" },
];

const Filters = () => {
  const dispatch = useDispatch();
  const { sitesColumns, filterInputs, sites } = useSelector((store) => store);

  // const [filterInputs, setFilterInputs] = useState({});

  useEffect(() => {
    dispatch({ type: "FETCH_SITES_COLUMNS" });
    if (!sites || sites.length === 0) {
      applyFilters();
    }
  }, []);

  const applyFilters = () => {
    const payload = [];
    for (const key in filterInputs) {
      payload.push({ field: key, input: filterInputs[key] });
    }

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
          .map((column) => {
            if (column.column_name === "state") {
              return (
                <Grid item xs={3} key={column.column_name}>
                  <TextField
                    fullWidth
                    variant="standard"
                    select
                    key={column.ordinal_position}
                    label={column.column_name.replace("_", " ")}
                    displayempty
                    // defaultValue={filterInputs[column.column_name] || ""}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_FILTER_INPUTS",
                        payload: {
                          ...filterInputs,
                          [[column.column_name]]: event.target.value,
                        },
                      })
                    }
                  >
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              );
            }
            return (
              <Grid item xs={3} key={column.column_name}>
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
            );
          })}
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
