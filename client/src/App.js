import './App.css';
import 'antd/dist/reset.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SinglePage from './pages/SinglePage';


const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider
    client={client}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='person'>
              <Route path=':id' element={<SinglePage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
