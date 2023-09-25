import { put, takeLatest } from "redux-saga/effects";

function* fetchAllSites() {
  // yield put({ type: "SET_SITES", payload: [] });
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

function* fetchFilteredSites(action) {
  // yield put({ type: "SET_SITES", payload: [] });
  try {
    const response = yield fetch(
      `/api/sites/filtered?filters=${JSON.stringify(action.payload)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const filteredSites = yield response.json();

    yield put({ type: "SET_SITES", payload: filteredSites });
  } catch (error) {
    console.log("Filtered sites get request failed", error);
  }
}

function* fetchSitesColumns() {
  try {
    const response = yield fetch("/api/sites/columns");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const sitesColumns = yield response.json();

    yield put({ type: "SET_SITES_COLUMNS", payload: sitesColumns });
  } catch (error) {
    console.log("Sites columns get request failed", error);
  }
}

function* addSitesColumn(action) {
  try {
    const response = yield fetch("/api/sites/columns", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error adding sites column");
    }

    yield put({ type: "FETCH_ALL_SITES" });
    yield put({ type: "FETCH_SITES_COLUMNS" });
  } catch (error) {
    console.log("Sites Column POST request failed", error);
  }
}

function* removeSitesColumn(action) {
  try {
    const response = yield fetch(
      `/api/sites/columns/${action.payload.columnName}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("Error Removing Sites Column");
    }

    yield put({ type: "FETCH_ALL_SITES" });
    yield put({ type: "FETCH_SITES_COLUMNS" });
  } catch (error) {
    console.log("Sites Column DELETE request failed", error);
  }
}

function* addSite(action) {
  const payload = action.payload;
  try {
    if (!action.payload.latitude || !action.payload.longitude) {
      const address =
        `${payload.street} ${payload.city} ${payload.st} ${payload.zip}`.replace(
          " ",
          "%20"
        );
      const geocodeResponse = yield fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const geocode = yield geocodeResponse.json();
      console.log("georesponse", geocode);
      if (geocode.results.length > 0) {
        payload.latitude = geocode.results[0].geometry.location.lat;
        payload.longitude = geocode.results[0].geometry.location.lng;
      }
      console.log("geocode test", {
        lat: payload.latitude,
        lng: payload.longitude,
      });
    }
    const response = yield fetch("/api/sites", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Fetching Admin Sites");
    }

    yield put({ type: "FETCH_ALL_SITES" });
  } catch (error) {
    console.log("Sites POST request failed", error);
  }
}
function* editSite(action) {
  try {
    const response = yield fetch("/api/sites", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Site");
    }

    yield put({ type: "FETCH_ALL_SITES" });
  } catch (error) {
    console.log("Sites PUT request failed", error);
  }
}

function* deleteSite(action) {
  try {
    const response = yield fetch(`/api/sites/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Sites");
    }

    yield put({ type: "FETCH_ALL_SITES" });
  } catch (error) {
    console.log("Sites DELETE request failed", error);
  }
}

function* sitesSaga() {
  yield takeLatest("FETCH_ALL_SITES", fetchAllSites);
  yield takeLatest("FETCH_FILTERED_SITES", fetchFilteredSites);
  yield takeLatest("FETCH_SITES_COLUMNS", fetchSitesColumns);
  yield takeLatest("REMOVE_SITES_COLUMN", removeSitesColumn);
  yield takeLatest("ADD_SITES_COLUMN", addSitesColumn);
  yield takeLatest("ADD_SITE", addSite);
  yield takeLatest("EDIT_SITE", editSite);
  yield takeLatest("DELETE_SITE", deleteSite);
}

export default sitesSaga;
