import React from 'react'
import { Routes as RoutesPages, Route, BrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import Category from '../../pages/Category'

export default function Routes() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <RoutesPages>
                <Route path='/' element={<Home /> }/>
                <Route path='/category/:id' element={<Category /> }/>
            </RoutesPages>
        </BrowserRouter>
    )
}
