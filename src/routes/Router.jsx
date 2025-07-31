import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Sidebar } from '~/components/navigation/Sidebar';
import Home from '~/pages/index.page';
import NotFound from '~/pages/404';
import SignIn from '~/pages/signin/index.page';
import NewList from '~/pages/list/new/index.page';
import SignUp from '~/pages/signup/index.page';
import ListIndex from '~/pages/lists/[listId]/index.page';

export const Router = () => {
  const auth = useSelector((state) => state.auth.token !== null);

  return (
    <BrowserRouter>
      <div id="page">
        <Sidebar />
        <div className="main_content">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {auth ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/lists/:listId" element={<ListIndex />} />
                <Route path="/list/new" element={<NewList />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/signin" />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
