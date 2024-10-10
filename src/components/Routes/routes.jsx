import React from 'react'
import { Routes as RoutesPages, Route, BrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import Category from '../../pages/Category'
import GiftList from '../../pages/GiftList' 

export default function Routes() {
    function composeBaseName(){
        if(!window.location.pathname.includes(process.env.PUBLIC_URL)) return '/'
        return process.env.PUBLIC_URL
    }

    return (
        <BrowserRouter basename={composeBaseName()}>
            <RoutesPages>
                <Route path='/' element={<Home /> }/>
                <Route path='/category/:id' element={<Category /> }/>
                <Route path='/gift-list' element={ <GiftList /> }/>
            </RoutesPages>
        </BrowserRouter>
    )
}
