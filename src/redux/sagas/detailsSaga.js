import { put, takeEvery } from 'redux-saga/effects';

function* fetchDetails(action){
    try {
        const response = yield fetch(`/api/details/${action.payload}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const details = yield response.json();
        yield put({ type: 'SET_DETAILS', payload: details[0] });
    }catch (error) {
        console.log('details get request failed', error)
    }

}

function* detailsSaga(){
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;