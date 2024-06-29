import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoute } from '../helpers/PublicRoute'
import { ProtectedRoute } from '../helpers/ProtectedRoute'
import { SignIn, Header, Dashboard, PageNotFound } from '../pages'; // Adjust the path if needed
import Exams from '../pages/Exams';
import Question from '../pages/Question';
import Profile from '../pages/Profile';
import Faqs from '../pages/Faqs';


const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<Navigate replace to="/sign-in" />} />
                <Route path="/sign-in" element={<SignIn />} />

            </Route>
            <Route path="/" element={<ProtectedRoute />}>
                <Route element={<Header />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/exams" element={<Exams />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/faqs" element={<Faqs />} />
                    {/* {Urls?.map(({ path, element }) => {
                        return <Route path={path} element={element} key={path} />;
                        })} */}
                    <Route path="*" element={<PageNotFound />} >
                    </Route>
                </Route>

            </Route>
        </Routes>
    )
}

export default Routing
