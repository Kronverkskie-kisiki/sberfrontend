import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../profile-page';
import { RiskPage } from '../risk-page';
import { ProfilesPage } from '../profiles-page';
export const AppRoutes = () =>
  (<Routes>
    {/* <Route path="/" element={}>*/}

    <Route path="profile" element={<ProfilesPage/>}>
      {/* <Route path=":id" element={<ProfilePage/>}/>*/}
    </Route>
    <Route path="profile/:id" element={<ProfilePage/>}/>
    <Route path="risk/:id" element={<RiskPage/>}/>
    <Route path="*" element={<>Искомая страница не найдена!</>}></Route>
    {/* </Route>*/}
  </Routes>);
