import React from "react";
import styles from "./CrumbsHeader.module.css"

type Props = {
    title: string;
    crumbs?: {
        name: string;
        href: string;
    }[]
}

export const CrumbsHeader: React.FC<Props> = ({ title, crumbs = [] }) => {
    return <header className={styles.crumbsHeader}>
        <h2>
            {crumbs.map(({ name, href }) => {
                return <React.Fragment key={href}>
                    <a href={href} >{name}</a>{" > "}
                </React.Fragment>
            })}
            <span>{title}</span>
        </h2>
    </header>
}