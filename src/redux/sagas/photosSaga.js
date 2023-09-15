import { put, takeEvery } from 'redux-saga/effects';

function* fetchPhotos(action){
    try {
        const response = yield fetch(`/api/photos/${action.payload}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const details = yield response.json();
        yield put({ type: 'SET_PHOTOS', payload: details });
    }catch (error) {
        console.log('details get request failed', error)
    }

}

function* photosSaga(){
    yield takeEvery('FETCH_PHOTOS', fetchPhotos);
}

export default photosSaga;