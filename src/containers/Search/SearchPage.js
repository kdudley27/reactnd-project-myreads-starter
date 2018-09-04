import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../BookShelf/BookShelf'
import * as BooksAPI from '../../BooksAPI'

class SearchPage extends Component {
  state = {
    query: '',
    booksFound: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    let booksFound = []
    if (query) {
      BooksAPI.search(query).then((result) => {
        if (result.length) {
          booksFound = result.map((book) => {
            let index = this.props.books.findIndex(b => b.id === book.id)
            if (index >= 0) {return this.props.books[index]
            } else { return book }
          })
        }
        this.setState({ booksFound })
      })} else { this.setState({ booksFound })}
  }

  render(){
    const { shelfChanger } = this.props

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <input
            className='search-books-input-wrapper'
            type='text'
            placeholder='Search books'
            value = {this.state.query || ""}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          </div>

          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.booksFound.map(book => (
                <BookShelf key = {book.id} books={book} shelfChanger={shelfChanger}/>
              ))}
            </ol>
          </div>

          <Link
            to='/'
            className='close-search'
          >Close</Link>

        </div>      
    )
  }
}

export default SearchPage