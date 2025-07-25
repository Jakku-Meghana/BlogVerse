import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditCategory,
  RouteIndex,
  RouteBlogEdit,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
  RouteReports, //New route for reports
  RouteCategoryRequestApproval // New route constant
} from './helpers/RouteName';

import Index from './pages/Index';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import AddCategory from './pages/Category/AddCategory';
import CategoryDetails from './pages/Category/CategoryDetails';
import EditCategory from './pages/Category/EditCategory';
import AddBlog from './pages/Blog/AddBlog';
import BlogDetails from './pages/Blog/BlogDetails';
import EditBlog from './pages/Blog/EditBlog';
import SingleBlogDetails from './pages/SingleBlogDetails';
import BlogByCategory from './pages/Blog/BlogByCategory';
import SearchResult from './pages/SearchResult';
import Comments from './pages/Comments';
import User from './pages/User';
import AuthRouteProtechtion from './components/AuthRouteProtechtion';
import OnlyAdminAllowed from './components/OnlyAdminAllowed';
import CategoryRequestApproval from './pages/Category/CategoryRequestApproval'; //New import
import ReportBlog from './pages/Blog/ReportBlog';
import BlogActions from './components/BlogActions'
import Reports from './pages/Reports'; //  Add this

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Index />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          {/* Authenticated User Routes */}
          <Route element={<AuthRouteProtechtion />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
            <Route path="/report/:blogid" element={<ReportBlog/>} />
          </Route>

          {/* Admin-only Routes */}
          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<User />} />
            <Route path={RouteCategoryRequestApproval} element={<CategoryRequestApproval />} /> {/* New Route */}
            <Route path={RouteReports} element={<Reports />} />

          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
