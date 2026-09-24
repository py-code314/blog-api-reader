/* -------------------- Components -------------------- */
import App from '../App'
import Home from '../pages/home/Home'
import ErrorPage from '../pages/error/ErrorPage'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
    ],
  },
]

export default routes
