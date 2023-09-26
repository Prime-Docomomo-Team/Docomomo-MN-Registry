import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const UserDatabase = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_USER",
    EDIT: "EDIT_USER",
    DELETE: "DELETE_USER",
  };

  // Single select column selection options
  const adminOptions = [
    { value: true, label: "Admin" },
    { value: false, label: "User" },
  ];
  // These are the columns for the DataGrid on Rewards page
  const columns = [
    { field: "id", headerName: "User ID", width: 70 },

    {
      field: "username",
      headerName: "Username",
      width: 120,
      editable: true,
    },
    // Decided it was unsecure to give admin access to all users passwords
    // {
    //   field: "password",
    //   headerName: "Password",
    //   width: 120,
    //   editable: true,
    // },
    {
      field: "admin",
      headerName: "Admin",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: adminOptions,
    },
  ];

  return (
    <DataGridCRUD
      columns={columns}
      rows={users}
      title="Users"
      rowTitle="User"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default UserDatabase;
