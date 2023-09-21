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
function* addPhoto(action) {
  try {
    const response = yield fetch("/api/photos", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Fetching Admin Sites");
    }

    yield put({ type: "FETCH_ALL_PHOTOS" });
  } catch (error) {
    console.log("Photos POST request failed", error);
  }
}
function* editPhoto(action) {
  try {
    const response = yield fetch("/api/photos", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Photo");
    }

    yield put({ type: "FETCH_ALL_PHOTOS" });
  } catch (error) {
    console.log("Photos PUT request failed", error);
  }
}

function* deletePhoto(action) {
  try {
    const response = yield fetch(`/api/photos/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Photos");
    }

    yield put({ type: "FETCH_ALL_PHOTOS" });
  } catch (error) {
    console.log("Photos DELETE request failed", error);
  }
}

function* photosSaga() {
  yield takeEvery("FETCH_PHOTOS", fetchPhotos);
  yield takeEvery("FETCH_ALL_PHOTOS", fetchAllPhotos);
  yield takeEvery("ADD_PHOTO", addPhoto);
  yield takeEvery("EDIT_PHOTO", editPhoto);
  yield takeEvery("DELETE_PHOTO", deletePhoto);
}

export default photosSaga;
