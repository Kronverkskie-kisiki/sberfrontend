import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../profile-page';
import { RiskPage } from '../risk-page';
import { ProfilesPage } from '../profiles-page';
export const AppRoutes = () =>
  (<Routes>
    <Route index path="/" element={<ProfilesPage/>}/>
    <Route path="/:id" element={<ProfilePage/>}/>
    <Route path="risk/:id" element={<RiskPage/>}/>
    <Route path="*" element={<>Искомая страница не найдена!</>}></Route>
  </Routes>);
