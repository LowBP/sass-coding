import React, { useEffect, useState } from 'react';
import styles from "./style.module.scss";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { fetchNewsList } from "../../state/actions";
import CsPagination from "../CsPagination";

const NewsList = ({ data, fetchNewsList }) => {
    const newsListId = useSelector(state => state);

    useEffect(() => {
        fetchNewsList();
    }, []);
    const [dataSplit, setDataSplit] = useState([]);
    const [spliceRange, setSpliceRannge] = useState({ start: 0, end: 10 })

    useEffect(() => {
        setSpliceRannge({
            start: 0,
            end: 10
        })
    }, [newsListId]);

    useEffect(() => {
        let getData = newsListId.data;
        let splicingId = [];
        if (getData.length > 0) {
            for (let i = (spliceRange.start + 1); i <= (spliceRange.end); i++) {
                splicingId = [...splicingId, getData[i]]
            }
        }
        setDataSplit(splicingId);
    }, [spliceRange]);

    const handleDataShilft = (val) => {
        setSpliceRannge({
            start: (val - 10),
            end: val
        })
    }

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles['pagination-ccontiner']}>
                    <CsPagination length={newsListId.data.length} totalCount={10} handleDataShilft={handleDataShilft} />
                </div>

                <table className={styles["table"]}>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (newsListId.loader) && (
                                <>
                                    <tr>
                                        <td colSpan={2} className={`${styles['loading']} ${styles["noBorder"]}`}>Loading...</td>
                                    </tr>
                                </>
                            )
                        }
                        {
                            (dataSplit).map((val, index) => {
                                return (
                                    val && (<tr key={index}>
                                        <td className={styles["noBorder"]}>{(spliceRange.start + index + 1)}</td>
                                        <td className={styles["noBorder"]}>{val}</td>
                                    </tr>)
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        data: state
    }
}
const mapDispatch = dispatch => {
    return {
        fetchNewsList: () => dispatch(fetchNewsList())
    }
}
export default connect(mapStateToProps, mapDispatch)(NewsList);
