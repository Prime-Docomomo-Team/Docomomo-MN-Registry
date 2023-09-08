import { put, takeLatest } from "redux-saga/effects";

function* fetchAllSites() {
  try {
    const response = yield fetch("/api/sites");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const sites = yield response.json();

    yield put({ type: "SET_SITES", payload: sites });
  } catch (error) {
    console.log("All sites get request failed", error);
  }
}

function* sitesSaga() {
  yield takeLatest("FETCH_ALL_SITES", fetchAllSites);
}

export default sitesSaga;
