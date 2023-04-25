import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css/normalize.css';

import {
    RouterProvider,
} from "react-router-dom";
import './index.css'
import { router } from "./router";

import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
)
