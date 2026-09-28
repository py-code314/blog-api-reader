/* -------------------- Components -------------------- */
import App from '../App'
import Homepage from '../pages/home/Homepage'
import ErrorPage from '../pages/error/ErrorPage'
import SignupPage from '../pages/auth/signup/SignupPage'
import LoginPage from '../pages/auth/login/LoginPage'

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
      { path: 'login', element: <LoginPage /> },
    ],
  },
]

export default routes
