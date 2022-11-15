import Mosaic from "../../components/Mosaic";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading"
import { useState } from "react";
import React from "react";

export default function Home() {
    const [loading, setLoading] = useState(true)

    return (
        <Layout>
            {loading && <Loading type={'mosaic'} />}
            <div>
                <Mosaic handleLoading={() => {
                    setLoading(false)
                }}/>
            </div>
        </Layout>
    )
}
