import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api'
import Image from '../../components/Image'
import List from '../../components/List'
import Modal from '../../components/Modal'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import BtnBackToHome from '../../components/BtnBackToHome'
import './styles.css'

export default function Category() {

    const params = useParams()
    const idCategory = params.id
    const [showModal, setShowModal] = useState('')
    const [item, setItem] = useState(null)
    const [category, setCategory] = useState(null)
    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getCategory() {
            const responseCategory = await api.get(`/categories/${idCategory}`)
            setCategory(responseCategory.data)
        }
        getCategory()
    }, [])

    function getItems() {
        setLoading(true)
        setItems(null)
        api.get(`/items?categoryId=${idCategory}`).then(response => {
            setItems(response.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getItems()
    }, [])

    function handleModal(item) {
        setShowModal(!showModal)

        if (item) {
            return setItem(item)
        }
    }

    return (
        <Layout showFooter={true}>
            {loading && <Loading type={'category'} />}
            {!loading &&
                <>
                    <div>
                        {category &&
                            <>
                                <Image isCategory={"category"} urlImage={category.urlImage} name={category.name} alt={category.name} size='lg' />
                                <List items={items} dispatch={(item) => handleModal(item)} />
                            </>
                        }
                        {showModal &&
                            <Modal item={item} onSuccess={() => getItems()} dispatch={() => handleModal()} />
                        }
                    </div>
                    <BtnBackToHome />
                </>
            }
        </Layout>
    )
}
