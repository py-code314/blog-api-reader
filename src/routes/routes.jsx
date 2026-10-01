/* -------------------- Components -------------------- */
import App from '../App'
import Homepage from '../pages/home/Homepage'
import ErrorPage from '../pages/error/ErrorPage'
import SignupPage from '../pages/auth/signup/SignupPage'
import LoginPage from '../pages/auth/login/LoginPage'
import DefaultMainLayout from '../components/features/main-default/DefaultMainLayout'
import Posts from '../components/features/posts/Posts'
import Authors from '../components/features/authors/Authors'
import Categories from '../components/features/categories/Categories'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: 'home', element: <Homepage />,
        children: [
          { index: true, element: <DefaultMainLayout /> },
          {path: 'posts', element: <Posts/>},
          {path: 'authors', element: <Authors/>},
          {path: 'categories', element: <Categories/>},
        ]
       },
      { path: 'signup', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]

export default routes
