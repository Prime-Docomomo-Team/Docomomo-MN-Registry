import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const SitesDatabase = () => {
  const dispatch = useDispatch();
  const sites = useSelector((store) => store.sites);
  const sitesColumns = useSelector((store) => store.sitesColumns);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SITES" });
    dispatch({ type: "FETCH_SITES_COLUMNS" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_SITE",
    EDIT: "EDIT_SITE",
    DELETE: "DELETE_SITE",
  };

  // These are the columns for the DataGrid on Rewards page
  const newColumns = sitesColumns.map((column) => ({
    field: column.column_name,
    headerName: column.column_name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    width: !["id", "state", "zip", "year_built"].includes(column.column_name)
      ? 120
      : 70,
    editable: column.column_name !== "id",
  }));
  const columns = [
    { field: "id", headerName: "Site ID", width: 70 },

    {
      field: "street",
      headerName: "Street",
      width: 120,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
      editable: true,
    },
    {
      field: "state",
      headerName: "State",
      width: 120,
      editable: true,
    },
    {
      field: "zip",
      headerName: "Zip",
      width: 120,
      editable: true,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      width: 120,
      editable: true,
    },
    {
      field: "longitude",
      headerName: "Longitute",
      width: 120,
      editable: true,
    },
    {
      field: "site_name",
      headerName: "Site Name",
      width: 120,
      editable: true,
    },
    {
      field: "architect",
      headerName: "Architect",
      width: 120,
      editable: true,
    },
    {
      field: "year_built",
      headerName: "Year Built",
      width: 120,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 120,
      editable: true,
    },
  ];

  return (
    <DataGridCRUD
      columns={newColumns}
      rows={sites}
      title="Sites"
      rowTitle="Site"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default SitesDatabase;
