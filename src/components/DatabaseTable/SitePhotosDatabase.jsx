import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const SitePhotosDatabase = () => {
  const dispatch = useDispatch();
  const photos = useSelector((store) => store.photos);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PHOTOS" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_PHOTO",
    EDIT: "EDIT_PHOTO",
    DELETE: "DELETE_PHOTO",
  };

  // These are the columns for the DataGrid on Rewards page
  const columns = [
    { field: "photo_id", headerName: "Photo ID", width: 70 },

    {
      field: "photo_name",
      headerName: "Photo Name",
      width: 120,
      editable: true,
    },
    {
      field: "photo_credit",
      headerName: "Photo Credit",
      width: 120,
      editable: true,
    },
    {
      field: "url_id",
      headerName: "URL ID",
      width: 120,
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",
      width: 120,
      editable: true,
    },
    {
      field: "sites_id",
      headerName: "Sites ID",
      width: 120,
      editable: true,
    },
  ];

  return (
    <DataGridCRUD
      columns={columns}
      rows={photos}
      title="Photos"
      rowTitle="Photo"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default SitePhotosDatabase;
