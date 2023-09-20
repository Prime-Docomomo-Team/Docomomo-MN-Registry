import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const SitesDatabase = () => {
  const dispatch = useDispatch();
  const { sites } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SITES" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_SITE",
    EDIT: "EDIT_SITE",
    DELETE: "DELETE_SITE",
  };

  // These are the columns for the DataGrid on Rewards page
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
      columns={columns}
      rows={sites}
      title="Sites"
      rowTitle="Site"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default SitesDatabase;
