import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPageLayout, HomePageLayout, AdminLayout, ShopLayout } from '@/layouts';
import { routesShop, routesAdmin, routesNoAuthorization, routesUsers } from '@/routes';
import { ErrorPage } from '@/pages';

export const Navigation = () => {
  return (
    <Suspense fallback={<span>...Loading</span>}>
      <BrowserRouter>
        {/* No protegidas */}
        <Routes>
          <Route path='/' element={<AuthPageLayout />}>
            {routesNoAuthorization.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          {/* Protegidas - usuarios*/}

          <Route path='/home' element={<HomePageLayout />}>
            {routesUsers.map(({ path, Component, index }) => (
              <Route key={path} path={path} element={<Component />} index={index} />
            ))}
          </Route>

          {/* Protegidas - Shop*/}

          <Route path='/shop' element={<ShopLayout />}>
            {routesShop.map(({ path, Component, index }) => (
              <Route key={path} path={path} element={<Component />} index={index} />
            ))}
          </Route>

          {/* Protegidas Admin */}
          <Route path='/dashboard' element={<AdminLayout />}>
            {routesAdmin.map(({ path, Component, index }) => (
              <Route key={path} path={path} element={<Component />} index={index} />
            ))}
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
