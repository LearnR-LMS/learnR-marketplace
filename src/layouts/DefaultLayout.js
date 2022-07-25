import React from 'react'
import { AppHeader, AppContent, AppFooter } from '../components/index.js';

export default function DefaultLayout() {
    return (
        <div>
            <div className="top-menu">
                <AppHeader />
            </div>
            <div className="main-content">
                <AppContent />
            </div>
            <div className="footer">
                <AppFooter />
            </div>
        </div >
    )
}