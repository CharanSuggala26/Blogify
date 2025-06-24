import {createBrowserRouter, RouterProvider,Navigate} from 'react-router-dom'
import './App.css';
import RootLayout from './RootLayout'
import Home from './components/Home';
import Signup from './components/login';
import Signin from './components/Register';
import UserProfile from './components/userprofile.jsx';
import AuthorProfile from './components/AuthorProfile.jsx'
import ArticlesByAuthor from './components/ArticlesByAuthor.jsx';
import Article from './components/Article.jsx';
import AddArticle from './components/AddArticle';
import Articles from './components/Articles.jsx';
import { useSelector } from 'react-redux';

function App() {
  let { currentUser } = useSelector((state) => state.userLogin);

  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:"/signin",
        element:<Signin />
      },
      {
        path:"/user-profile",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles' />
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'new-article',
            element:<AddArticle />
          },
          {
            path:'articles-by-author/:username',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to={`articles-by-author/${currentUser.username}`} />
          }
        ]
      }
    ]
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;