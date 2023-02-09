import React, { Fragment, useEffect, useState } from 'react';
import Pagination, { bootstrap5PaginationPreset } from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';



const CsPagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [beforeSliceBtn, setBeforeSliceBtn] = useState(1);

    useEffect(() => {
        let getLength = props.length;
        let split = parseInt(getLength) / 10;
        setBeforeSliceBtn(Math.ceil(split))
    }, [props.length])

    useEffect(() => {
        props.handleDataShilft(currentPage * 10);
    }, [currentPage])

    return (
        <>
            <Pagination
                {...bootstrap5PaginationPreset}
                current={currentPage}
                total={beforeSliceBtn}
                onPageChange={setCurrentPage}
            />
        </>
    )
}


export default CsPagination;