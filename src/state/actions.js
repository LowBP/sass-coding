// Find Hacker News API here
// https://github.com/HackerNews/API
import axios from 'axios';

export const FETCH_NEWS_LIST_VIEW = 'FETCH_NEWS_LIST_VIEW';
export const FETCH_NEWS_LIST_VIEW_SUCESS = 'FETCH_NEWS_LIST_VIEW_SUCESS';
export const FETCH_NEWS_LIST_VIEW_FAIL = 'FETCH_NEWS_LIST_VIEW_FAIL';
export const FETCH_NEWS_LIST_DETAIL_VIEW_SUCESS = 'FETCH_NEWS_LIST_DETAIL_VIEW_SUCESS';
export const FETCH_NEWS_KIDS_LIST_DETAIL_VIEW_SUCESS = 'FETCH_NEWS_KIDS_LIST_DETAIL_VIEW_SUCESS';

// TODO fetch ask stories (https://hacker-news.firebaseio.com/v0/askstories.json)
const HACKER_NEWS_API = 'https://hacker-news.firebaseio.com/v0'

// export function loadTopstories() {return async (dispatch, getState) => {};}
const fetchListView = () => {
    return {
        type: FETCH_NEWS_LIST_VIEW
    }
}

const fetchListViewSucess = (data) => {
    return {
        type: FETCH_NEWS_LIST_VIEW_SUCESS,
        payload: data
    }
}

const fetchKidsDetailListViewSucess = (data,) => {
    return {
        type: FETCH_NEWS_KIDS_LIST_DETAIL_VIEW_SUCESS,
        payload: data,
    }
}
const fetchDetailListViewSucess = (data) => {
    return {
        type: FETCH_NEWS_LIST_DETAIL_VIEW_SUCESS,
        payload: data,
    }
}

const fetchListViewFail = (error) => {
    return {
        type: FETCH_NEWS_LIST_VIEW_FAIL,
        payload: error
    }
}

export const fetchNewsList = () => {
    return (dispatch) => {
        dispatch(fetchListView())
        axios.get(`${HACKER_NEWS_API}/askstories.json`).then(res => {
            dispatch(fetchListViewSucess(res.data))
        }).catch(error => {
            dispatch(fetchListViewFail(error.message))
        })
    }
}

export const fetchDetailNewsList = (data, type = '') => {
    return (dispatch) => {
        if (type == "kidsView") {
            axios.get(`${HACKER_NEWS_API}/item/${data}.json`).then(res => {
                dispatch(fetchKidsDetailListViewSucess(res.data))
            }).catch(error => {
                dispatch(fetchListViewFail(error.message))
            })
        } else {
            dispatch(fetchListView());
            axios.get(`${HACKER_NEWS_API}/item/${data}.json`).then(res => {
                dispatch(fetchDetailListViewSucess(res.data))
            }).catch(error => {
                dispatch(fetchListViewFail(error.message))
            })
        }
    }
}



// TODO fetch item by id (https://hacker-news.firebaseio.com/v0/item/<itemId>.json)
