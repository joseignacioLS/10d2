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
                return <><a href={href} key={href}>{name}</a>{" > "}
                </>
            })}
            <span>{title}</span>
        </h2>
    </header>
}