import React from 'react'
import styles from '../css/AppContent.module.css';
import ListNft from './nft/ListNfts';

export default function AppContent() {
    return (
        <div className="myInventory">
            <div className={styles.money}>
                Money
            </div>
            <div className={styles.inventory}>
                <ListNft />
            </div>
        </div>
    )
}
