import React from 'react'
import styles from '../../css/nft/Nft.module.css'
import { Image } from 'antd';
import { Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

export default function Nft() {
    return (
        <div className={styles.item}>
            <div className={styles.warpImage} >
                <div className={styles.itemImage}>
                    <Image className={styles.image} src="https://assets.apemove.io/shoes/214.png?t=1" alt="image nft" />
                </div>
            </div>

            <div className={styles.itemInformation}>
                <p className={styles.typePen}>walker</p>
                <p className={styles.idPen}>#106266</p>
                <p>
                    <span>Level: 0</span>
                    <span>Rarity: Common</span>
                    <span>Mint: 0</span>
                </p>
            </div>
            <div style={{ width: "100%" }}>
                <Button className={styles.itemActionButton} ><UndoOutlined spin />App Inventory</Button>
            </div>
        </div >
    )
}
