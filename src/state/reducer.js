import { FETCH_NEWS_LIST_VIEW, FETCH_NEWS_LIST_VIEW_SUCESS, FETCH_NEWS_LIST_VIEW_FAIL, FETCH_NEWS_LIST_DETAIL_VIEW_SUCESS, FETCH_NEWS_KIDS_LIST_DETAIL_VIEW_SUCESS } from "./actions"



const initialListView = {
    loader: false,
    data: [],
    error: '',
    detailData: {},
    kidsListDetails: {}
};

export default function newsListReducer(state = initialListView, action) {
    switch (action.type) {
        case FETCH_NEWS_LIST_VIEW: return {
            ...state,
            loader: true
        }
        case FETCH_NEWS_LIST_VIEW_SUCESS: return {
            ...state,
            loader: false,
            data: action.payload,
            error: ''
        }
        case FETCH_NEWS_LIST_DETAIL_VIEW_SUCESS: return {
            ...state,
            loader: false,
            detailData: { ...(action.payload) },
            error: ''
        }
        case FETCH_NEWS_KIDS_LIST_DETAIL_VIEW_SUCESS: return {
            ...state,
            loader: false,
            kidsListDetails: action.payload,
            error: ''
        }
        case FETCH_NEWS_LIST_VIEW_FAIL: return {
            ...state,
            loader: false,
            data: [],
            error: action.payload

        }
        default:
            return state;
    }
}
