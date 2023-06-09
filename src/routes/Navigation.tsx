import { Suspense} from 'react'
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import {  routesUsers } from './routesUsers'
import { AuthPageLayout, HomePageLayout } from '../layouts'
import { routesNoAuthorization } from './routesNoAuthorization'
import { routesShop } from './routesShop';
import { ShopLayout } from '../layouts/ShopLayout';
import ErrorPage from '../pages/ErrorPage';
import { routesAdmin } from './routesAdmin';
import { AdminLayout } from '../layouts/AdminLayout';



export const Navigation = () => {


    return (
        <Suspense fallback={<span>...Loading</span>}>
            <BrowserRouter>
                {/* No protegidas */}
                <Routes>
                    <Route path='/' element={<AuthPageLayout/>}>

                        {
                            routesNoAuthorization.map(({ path, Component  })=> (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                />
                            ))
                        }
                    </Route>

                {/* Protegidas - usuarios*/}
                    
                    <Route  path='/home' element={<HomePageLayout/>}>
                        {
                            routesUsers.map( ({ path, Component , index }) => (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                    index={index}
                                />
                            ))
                        }
                    </Route>

                {/* Protegidas - Shop*/}
                    
                    <Route  path='/shop' element={<ShopLayout/>}>
                        {
                            routesShop.map( ({ path, Component , index }) => (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                    index={index}
                                />
                            ))
                        }
                    </Route>

                {/* Protegidas Admin */}
                    <Route  path='/dashboard' element={<AdminLayout/>}>
                        {
                            routesAdmin.map( ({ path, Component , index }) => (
                                <Route 
                                    key={ path }
                                    path={ path }
                                    element={ <Component /> } 
                                    index={index}
                                />
                            ))
                        }
                    </Route>
                    <Route path='*' element={<ErrorPage/>}/>




                </Routes>
                

            </BrowserRouter>

        </Suspense>
    )
}
