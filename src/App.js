import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchPage from './containers/Search/SearchPage'
import MyBooks from './componets/MyBooks/MyBooks'

class BooksApp extends React.Component {
  state = {
     books: [],
   };

  componentDidMount (){
    BooksAPI.getAll().then((books)=> {
      this.setState({ books })
    })
  };

  shelfChanger=(book, shelf)=>{
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(item => item.id !== book.id).concat([book])
      }))
    })
  };

  render() {
    return (
      <div>
        <Route exact path="/" render={() =>
          <MyBooks books={this.state.books} shelfChanger={this.shelfChanger} />}
          />

        <Route
          path="/SearchPage"
          render={() => (
            <SearchPage
              books={this.state.books}
              shelfChanger={this.shelfChanger}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp