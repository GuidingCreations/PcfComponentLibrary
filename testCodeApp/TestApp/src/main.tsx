import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import PowerProvider from './PowerProvider.tsx'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestPage2 from './routes/RootLayout/Children/TestPage2.tsx';
import TestPage from './routes/RootLayout/Children/TestPage.tsx';
import RootLayout from './routes/RootLayout/RootLayout.tsx';
import HomePage from './routes/RootLayout/Children/HomePage.tsx';
import MyOwnedGroups from './routes/RootLayout/Children/Groups/MyOwnedGroups.tsx';

console.log("LOADING ROUTES")

const router = createBrowserRouter([{
   element: <App/>,
   errorElement: <HomePage />,
   children: [
    {
      element: <RootLayout/>,
      children: [
        {
          element: <HomePage/>,
          path: '/'
        },
        {
          element: <TestPage/>,
          path: "/TestPage"
        },
        {
          element: <TestPage2/>,
          path: "/TestPage2"
        },
        {
          path: 'Groups',
          children: [
            {path: 'MyOwnedGroups', element: <MyOwnedGroups/>}
          ]
        },
        {
          path: '*',
          element: <HomePage /> 
        }
      ]
    }
   ]
  }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <PowerProvider>
    <RouterProvider router={router}/>
  </PowerProvider>
</StrictMode>,
)
