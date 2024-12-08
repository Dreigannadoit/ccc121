import React, { useState, useEffect, useCallback  } from "react";
import Header from "../components/Header";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../css/resources.css";
import { bookTestDatabase } from "../constants";
import useScrollToTop from "../hooks/useScrollToTop";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const location = useLocation();
  const navigate = useNavigate();

  // Sync URL with page state
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedGenre) params.set("genre", selectedGenre);
    if (selectedAvailability) params.set("availability", selectedAvailability);
    params.set("page", currentPage);
  
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, selectedGenre, selectedAvailability, currentPage]);  

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  
  const handleSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      updateURL();
    }, 300), // Adjust delay as needed
    []
  );

  // Update the URL when the filters or page changes
  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedGenre) params.set("genre", selectedGenre);
    if (selectedAvailability) params.set("availability", selectedAvailability);
    params.set("page", currentPage);
    
    navigate(`?${params.toString()}`);
  };

  // Filter books based on search, genre, and availability
  const filteredBooks = bookTestDatabase.filter((book) => {
    const matchesSearchQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = selectedGenre
      ? book.genre.toLowerCase() === selectedGenre.toLowerCase()
      : true;

    const matchesAvailability =
      selectedAvailability === ""
        ? true
        : selectedAvailability === "Available"
        ? book.availablity
        : !book.availablity;

    return matchesSearchQuery && matchesGenre && matchesAvailability;
  });

  // Get the current books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle page change
  const paginate = (pageNumber) => {
    if (pageNumber === currentPage) return; // Prevent redundant updates
    setCurrentPage(pageNumber);
  };

  useScrollToTop(); 

  return (
    <section className="resources">
      <Header current_page="Resources" />

      <div className="content">
        {/* Pass state and handlers as props to userSortTools */}
        <UserSortTools
          searchQuery={searchQuery}
          selectedGenre={selectedGenre}
          selectedAvailability={selectedAvailability}
          handleSearch={handleSearch}
          setSelectedGenre={setSelectedGenre}
          setSelectedAvailability={setSelectedAvailability}
          updateURL={updateURL}
        />

        <div className="books_container">
          {currentBooks.length > 0 ? (
            currentBooks.map((book, index) => (
              <div className="book_card" key={book.bookid || index}>
                <div className="img_container">
                  <img src={book.bookimg} alt={`${book.title} cover`} />
                </div>

                <div className="info">
                  <div
                    className={`availability ${
                      book.availablity ? "available" : "unavailable"
                    }`}
                  >
                    <div className="light"></div>
                    <p>{book.availablity ? "Available" : "Unavailable"}</p>
                  </div>

                  <h1>{book.title}</h1>
                  <h2>{book.author}</h2>
                  <p>#{book.bookid}</p>

                  <div className="crud_controlls">
                    <NavLink to={`/edit/${book.bookid}`}>Edit</NavLink>
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Modified UserSortTools to accept props
const UserSortTools = ({
  searchQuery,
  selectedGenre,
  selectedAvailability,
  handleSearch,
  setSelectedGenre,
  setSelectedAvailability,
  updateURL,
}) => {
  return (
    <div className="sort_tools">
      <div className="filters">
        <div className="searchbox">
          
          <h1>Pick A Genre</h1>
          <input
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={handleSearch}
            onBlur={updateURL} // Update URL when search input is blurred
          />
        </div>

        <div className="dropdown">
          <h1>Pick A Genre</h1>
          <select
        
            className="modern-dropdown"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              updateURL(); // Update URL when genre changes
            }}
          >
            <option value="">All Genres</option>
            <option value="Literature">Literature</option>
            <option value="Math">Math</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
            <option value="Algebra">Algebra</option>
            <option value="History">History</option>
            <option value="General Science">General Science</option>
            <option value="Economics">Economics</option>
            <option value="Calculus">Calculus</option>
            <option value="Political Science">Political Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Natural Science">Natural Science</option>
          </select>
        </div>

        <div className="dropdown">
          <h1>Check Availability</h1>
          <select
            className="modern-dropdown"
            value={selectedAvailability}
            onChange={(e) => {
              setSelectedAvailability(e.target.value);
              updateURL(); // Update URL when availability changes
            }}
          >
            <option value="">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

      </div>
      
      <div className="addNew ">
        <NavLink to="/add-book">Add Book</NavLink>
      </div>
    </div>
  );
};

export default Resources;
