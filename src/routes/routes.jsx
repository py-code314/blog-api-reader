/* -------------------- Components -------------------- */
import App from '../App'
import Home from '../pages/home/Home'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {path: 'home', element: <Home/>}
    ]
  },
]

export default routes
