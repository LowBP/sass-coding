import React, { useEffect, useState } from 'react';
import styles from "./style.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList, fetchDetailNewsList } from "../../state/actions";
import CsPagination from "../CsPagination";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NewsList = () => {
    const newsListId = useSelector(state => state);
    const getDispatchList = useDispatch();
    const [show, setShow] = useState(false);
    const [kidsViewShow, setKidsViewShow] = useState(false);
    const [detailedArray, setDetailedArray] = useState([]);
    const [kidsDetailedArray, setKidsDetailedArray] = useState([]);
    const [dataSplit, setDataSplit] = useState({});
    const [spliceRange, setSpliceRannge] = useState({ start: 0, end: 10 })


    useEffect(() => {
        getDispatchList(fetchNewsList());
    }, []);
    useEffect(() => {
        setSpliceRannge({
            start: 0,
            end: 10
        })
    }, [newsListId.data]);

    useEffect(() => {
        setDetailedArray([
            ...detailedArray,
            newsListId.detailData
        ]);
    }, [newsListId.detailData]);

    useEffect(() => {
        setKidsDetailedArray([
            ...kidsDetailedArray,
            newsListId.kidsListDetails
        ]);
    }, [newsListId.kidsListDetails]);

    useEffect(() => {
        if (newsListId?.data.length > 0) {
            setDetailedArray([]);
            for (let i = spliceRange.start; i < spliceRange.end; i++) {
                getDispatchList(fetchDetailNewsList(newsListId.data[i]))
            }
        }
    }, [spliceRange]);

    const handleDataShilft = (val) => {
        setSpliceRannge({
            start: (val - 10),
            end: val
        })
    }
    const handleClose = () => setShow(false);
    const handleKidsViewClose = () => setKidsViewShow(false);
    const handleShow = (val) => {
        setDataSplit(val)
        setShow(true)
    };
    const handleKidsViewShow = (val) => {
        setKidsDetailedArray([]);
        for (let i = 0; i < val.length; i++) {
            getDispatchList(fetchDetailNewsList(val[i], 'kidsView'))
        }
        setKidsViewShow(true)
    }

    const handleTimeConverter = (val) => {
        if (!val) return '--';
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dates = new Date(val);
        return dates.getDate() + '/' + (parseInt(dates.getMonth()) + 1) + '/' + dates.getFullYear();
    }

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles['pagination-ccontiner']}>
                    <CsPagination length={newsListId.data.length} totalCount={10} handleDataShilft={handleDataShilft} />
                </div>
                <div className={styles["table-responsive"]}>
                    <table width="100%" className={styles["table"]}>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">time</th>
                                <th scope="col">By</th>
                                <th scope="col">descendants</th>
                                <th scope="col">title</th>
                                <th scope="col">text</th>
                                <th scope="col">type</th>
                                <th scope="col">score</th>
                                <th scope="col">Total Kids</th>
                                <th scope="col">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (newsListId.loader) && (
                                    <>
                                        <tr>
                                            <td colSpan={11} className={`${styles['loading']} ${styles["noBorder"]}`}>Loading...</td>
                                        </tr>
                                    </>
                                )
                            }
                            {
                                (detailedArray).map((val, index) => {
                                    return (
                                        val?.id && (
                                            <tr key={index}>
                                                <td className={styles["noBorder"]}>{(spliceRange.start + index + 1) ?? '--'}</td>
                                                <td className={styles["noBorder"]}>{val.id ?? '--'}</td>
                                                <td className={styles["noBorder"]}>{handleTimeConverter(val.time)}</td>
                                                <td className={styles["noBorder"]}>{val.by ?? '--'}</td>
                                                <td className={styles["noBorder"]}>{val.descendants ?? '--'}</td>
                                                <td className={styles["noBorder"]}><span className={`text-ellipse ${styles["list-title"]}`} dangerouslySetInnerHTML={{ __html: val.title ?? '--' }}></span></td>
                                                <td className={`${styles["noBorder"]}`}><span className={`text-ellipse ${styles["list-title"]}`} dangerouslySetInnerHTML={{ __html: val.text ?? '--' }}></span></td>
                                                <td className={styles["noBorder"]}><span className={(val.type == 'story') ? styles['story-btn'] : (val.type == 'comment') ? styles['comment-btn'] : ((val.type == 'poll') || (val.type == 'pollopt')) ? styles['poll-btn'] : styles['type-btn']}>{val.type ?? '--'}</span></td>
                                                <td className={styles["noBorder"]}>{val.score ?? '--'}</td>
                                                <td className={`${styles["noBorder"]} ${styles["kids-count-view"]}`}>
                                                    <div className="d-flex justify-content-between align-content-center">
                                                        <span className="pe-3 my-auto">{val?.kids?.length ?? '--'}</span>
                                                        {
                                                            (val?.kids?.length) && (
                                                                <Button className={`${styles["view"]}`} onClick={(e) => { e.preventDefault(); handleKidsViewShow(val?.kids) }}>
                                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
                                                                </Button>
                                                            )
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button variant="primary" onClick={(e) => { e.preventDefault(); handleShow(val) }}>
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h6 className="fs-5">{dataSplit?.title}</h6>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p><span className="fw-bold">By</span>: {dataSplit?.by ?? ''}</p>
                        <p><span className="fw-bold">Type</span>: <span className={`${styles["modal-type-btn"]} ${(dataSplit.type == 'story') ? styles['story-btn'] : (dataSplit.type == 'comment') ? styles['comment-btn'] : ((dataSplit.type == 'poll') || (dataSplit.type == 'pollopt')) ? styles['poll-btn'] : styles['type-btn']}`}>{dataSplit.type ?? '--'}</span></p>
                        <p><span className="fw-bold">Total Kids</span>: {dataSplit?.kids?.length ?? '--'}</p>
                        <p><span className="fw-bold">Score</span>: {dataSplit?.score ?? ''}</p>
                        <h6 className="fw-bold">Description</h6>
                        <p className="fs-6" dangerouslySetInnerHTML={{ __html: dataSplit?.text ?? '--' }}></p>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ========= START: Kids view modal box
            ======================================== */}

            <Modal show={kidsViewShow} dialogClassName={`${styles["modal-popup-xxl"]}`} onHide={handleKidsViewClose}>
                <Modal.Header closeButton>
                    <h6 className="fs-5">Kids List</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles["table-modal-box"]}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">time</th>
                                    <th scope="col">By</th>
                                    <th scope="col">text</th>
                                    <th scope="col">type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (newsListId.loader) && (
                                        <>
                                            <tr>
                                                <td colSpan={11} className={`${styles['loading']} ${styles["noBorder"]}`}>Loading...</td>
                                            </tr>
                                        </>
                                    )
                                }
                                {
                                    (kidsDetailedArray).map((val, index) => {
                                        return (
                                            val?.id && (
                                                <tr key={index}>
                                                    <td className={styles["noBorder"]}>{(index + 1) ?? '--'}</td>
                                                    <td className={styles["noBorder"]}>{val.id ?? '--'}</td>
                                                    <td className={styles["noBorder"]}>{handleTimeConverter(val.time)}</td>
                                                    <td className={styles["noBorder"]}>{val.by ?? '--'}</td>
                                                    <td className={`${styles["noBorder"]}`}><span title={val.text} className={`text-ellipse ${styles["list-title"]}`} dangerouslySetInnerHTML={{ __html: val.text ?? '--' }}></span></td>
                                                    <td className={styles["noBorder"]}><span className={(val.type == 'story') ? styles['story-btn'] : (val.type == 'comment') ? styles['comment-btn'] : ((val.type == 'poll') || (val.type == 'pollopt')) ? styles['poll-btn'] : styles['type-btn']}>{val.type ?? '--'}</span></td>
                                                </tr>
                                            )
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleKidsViewClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}






export default NewsList;
