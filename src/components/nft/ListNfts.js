import React from 'react'
import { Divider } from 'antd';
import Nft from './Nft';

export default function ListNfts() {
    return (
        <>
            <Divider orientation="center">NFT Inventory (1)</Divider>
            <div className="listItems">
                < Nft/>

            </div>
        </>
    )
}
