import React, { Component, useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import Login from './login/index';
import log from '../../utils/log';

import styles from './index.module.scss';

type PageDataType = {
    pageUrl: string;
    avlScroll: number;
    read: number;
}

type LocalPageDataType = {
    [key: string]: PageDataType
}

type WatchListType = PageDataType[];

interface PopupTypes {

}

const Popup = (props: PopupTypes) => {
    const [watchList, setWatchList]: [WatchListType, (WatchListType) => void] = useState([]);

    useEffect(() => {
        chrome.storage.local.get((data: LocalPageDataType) => {
            let watchList: WatchListType = Object.keys(data).map((page: string, index: number) => ({
                pageUrl: page,
                ...data[page]
            }));

            setWatchList(watchList);
        });
    });

    useEffect(() => {
        log();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.totalInfo}>
                {watchList.length}
            </div>
            <div>
                {watchList.map((page: PageDataType, index: number) => (
                    <div className={styles.itemWrapper} key={index}>
                        <div className={styles.progressBar} style={{ width: `${(page.read / page.avlScroll)*100 + '%'}` }}></div>
                        <div className={styles.contentWrapper}>
                            <div className={styles.title}>{page.pageUrl}</div>
                            <div style={{ color: 'red' }} className={styles.info}>{`${page.read} --- ${page.avlScroll}`}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDom.render(<Popup />, document.getElementById('root'));