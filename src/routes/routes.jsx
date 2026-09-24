/* -------------------- Components -------------------- */
import App from '../App'
import Homepage from '../pages/home/Homepage'
import ErrorPage from '../pages/error/ErrorPage'
import SignupPage from '../pages/auth/signup/SignupPage'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'home', element: <Homepage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]

export default routes
