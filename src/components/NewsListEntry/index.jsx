import React from "react";
import styles from "./style.module.scss";




const NewsListEntry = (props) => {
    return (
        <>
            <table className={styles["table"]}>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quality</th>
                        <th scope="col">SellIn</th>
                        <th scope="col">Type</th>
                        <th scope="col">SecondHand</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (props?.data) && (props?.data).map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td className={styles["noBorder"]}>2</td>
                                    <td className={styles["noBorder"]}>1</td>
                                    <td className={styles["noBorder"]}>1</td>
                                    <td className={styles["noBorder"]}>1</td>
                                    <td className={styles["noBorder"]}>1</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}



export default NewsListEntry;