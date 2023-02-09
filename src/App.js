import React from 'react';
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import store from './state/store';
import NewsList from './components/NewsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Task2 } from './Task2';

function App() {
    return (
        <Provider store={store}>
            <Container >
                <h2 className='text-white text-center mt-5 font-bold display-4 fw-bolder'>Task-1: <br/> Hacker News Topstories</h2>
                <NewsList />
                <h2 className='text-white text-center mt-5 font-bold display-4 fw-bolder'>Task-2: <br/>Products <span className='fs-6 fw-normal'>Result shown in console</span></h2>
                <Task2 />
            </Container>
        </Provider>
    );
}

export default App;
