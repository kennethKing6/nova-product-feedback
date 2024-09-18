import React from 'react'
import styles from './index.module.css';

export default function Index({ status }) {

    if (status.toLocaleLowerCase() === "Planned".toLocaleLowerCase()) {
        return (
            <span className={`${styles.text}`}>
                <span className={`${styles.indicators}`} style={{ backgroundColor: '#F49F85', }} />
                Planned
            </span>
        )
    } else if (status.toLocaleLowerCase() === "In-Progress".toLocaleLowerCase()) {
        return (
            <span className={`${styles.text}`}>
                <span className={`${styles.indicators}`} style={{ backgroundColor: '#AD1FEA', }} />
                In-Progress
            </span>
        )
    } else if (status.toLocaleLowerCase() === "Live".toLocaleLowerCase()) {
        return (
            <span className={`${styles.text}`}>
                <span className={`${styles.indicators}`} style={{ backgroundColor: '#62BCFA', }} />
                Live
            </span>
        )
    }
}
