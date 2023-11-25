import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Profile } from '../profile';
export const AppRoutes = () =>
  (<Routes>
    {/* <Route path="/" element={}>*/}
    <Route path="profile" element={<Profile/>}/>
    <Route path="*" element={<>Искомая страница не найдена!</>}></Route>
    {/* </Route>*/}
  </Routes>);
