import '@/styles/globals.css'
import '../styles/globals.scss'
import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout.jsx"
import { Layout2 } from '@/components'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
