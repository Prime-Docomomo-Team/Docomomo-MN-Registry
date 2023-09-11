import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch();
  const { sitesColumns } = useSelector((store) => store);

  const [filterInputs, setFilterInputs] = useState({});

  useEffect(() => {
    dispatch({ type: "FETCH_SITES_COLUMNS" });
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
    setFilterInputs({});
    dispatch({ type: "FETCH_ALL_SITES" });
  };

  return (
    <div>
      {sitesColumns
        .filter(
          (column) =>
            !["id", "latitude", "longitude", "description"].includes(
              column.column_name
            )
        )
        .map((column) => (
          <TextField
            key={column.ordinal_position}
            label={column.column_name.replace("_", " ")}
            value={filterInputs[column.column_name] || ""}
            onChange={(event) =>
              setFilterInputs({
                ...filterInputs,
                [[column.column_name]]: event.target.value,
              })
            }
          />
        ))}
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
      <Button variant="outlined" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
