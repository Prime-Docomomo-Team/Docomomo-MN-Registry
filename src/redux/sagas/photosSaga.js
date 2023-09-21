import { put, takeEvery } from "redux-saga/effects";

function* fetchPhotos(action) {
  try {
    const response = yield fetch(`/api/photos/${action.payload}`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const details = yield response.json();
    yield put({ type: "SET_PHOTOS", payload: details });
  } catch (error) {
    console.log("details get request failed", error);
  }
}
function* fetchAllPhotos(action) {
  try {
    const response = yield fetch(`/api/photos`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const photos = yield response.json();
    yield put({ type: "SET_PHOTOS", payload: photos });
  } catch (error) {
    console.log("all photos get request failed", error);
  }
}

function* photosSaga() {
  yield takeEvery("FETCH_PHOTOS", fetchPhotos);
  yield takeEvery("FETCH_ALL_PHOTOS", fetchAllPhotos);
}

export default photosSaga;
