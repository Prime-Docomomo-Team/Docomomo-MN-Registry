import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch();
  const { sitesColumns } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_SITES_COLUMNS" });
  }, []);

  const applyFilters = () => {
    dispatch({
      type: "FETCH_FILTERED_SITES",
      payload: [
        { field: "architect", input: "williaM purdy" },
        { field: "street", input: "penn" },
      ],
    });
  };

  console.log("sitesColumns", sitesColumns);

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
          />
        ))}
      <Button variant="contained">Apply Filters</Button>
      <Button variant="outlined">Clear Filters</Button>
    </div>
  );
};

export default Filters;
