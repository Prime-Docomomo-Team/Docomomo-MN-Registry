import { useDispatch } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch();

  const applyFilters = () => {
    dispatch({
      type: "FETCH_FILTERED_SITES",
      payload: [
        { field: "architect", input: "williaM purdy" },
        { field: "street", input: "penn" },
      ],
    });
  };

  return <div onClick={applyFilters}>Filters</div>;
};

export default Filters;
