import React from 'react'
import Header from './Header'

const Layout2 = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout2
