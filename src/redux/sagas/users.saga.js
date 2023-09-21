import { put, takeEvery } from "redux-saga/effects";

function* fetchAllUsers(action) {
  try {
    const response = yield fetch(`/api/users`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const users = yield response.json();
    yield put({ type: "SET_USERS", payload: users });
  } catch (error) {
    console.log("all users get request failed", error);
  }
}
function* addUser(action) {
  try {
    const response = yield fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Adding User");
    }

    yield put({ type: "FETCH_ALL_USERS" });
  } catch (error) {
    console.log("Users POST request failed", error);
  }
}
function* editUser(action) {
  try {
    const response = yield fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing User");
    }

    yield put({ type: "FETCH_ALL_USERS" });
  } catch (error) {
    console.log("Users PUT request failed", error);
  }
}

function* deleteUser(action) {
  try {
    const response = yield fetch(`/api/users/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Users");
    }

    yield put({ type: "FETCH_ALL_USERS" });
  } catch (error) {
    console.log("Users DELETE request failed", error);
  }
}

function* usersSaga() {
  yield takeEvery("FETCH_ALL_USERS", fetchAllUsers);
  yield takeEvery("ADD_USER", addUser);
  yield takeEvery("EDIT_USER", editUser);
  yield takeEvery("DELETE_USER", deleteUser);
}

export default usersSaga;
