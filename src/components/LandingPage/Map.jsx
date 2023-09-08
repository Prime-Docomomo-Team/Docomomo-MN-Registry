import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Map = () => {
  const dispatch = useDispatch();
  const { sites } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SITES" });
  }, []);

  console.log(sites);

  return <div>Map</div>;
};

export default Map;
