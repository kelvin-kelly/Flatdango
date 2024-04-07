document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display details of the first movie
    const fetchFirstMovieDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/films/1');
        const movieData = await response.json();
        
        const {
          title,
          runtime,
          capacity,
          showtime,
          tickets_sold,
          description,
          poster
        } = movieData;
  
        const availableTickets = capacity - tickets_sold;
  
        // Update HTML elements with movie details
        document.getElementById('title').textContent = title;
        document.getElementById('runtime').textContent = `${runtime} minutes`;
        document.getElementById('showtime').textContent = showtime;
        document.getElementById('film-info').textContent = description;
        document.getElementById('ticket-num').textContent = availableTickets;
        document.getElementById('poster').src = poster;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
  
    // Function to fetch and display list of movies in the menu
    const fetchMovieList = async () => {
      try {
        const response = await fetch('http://localhost:3000/films');
        const movieList = await response.json();
  
        const filmsList = document.getElementById('films');
  
        // Remove placeholder li element
        const placeholderLi = document.querySelector('.film.item');
        filmsList.removeChild(placeholderLi);
  
        // Populate the films menu
        movieList.forEach((movie) => {
          const { id, title } = movie;
          const filmItem = document.createElement('li');
          filmItem.classList.add('film', 'item');
          filmItem.textContent = title;
          filmItem.dataset.movieId = id;
          filmsList.appendChild(filmItem);
        });
      } catch (error) {
        console.error('Error fetching movie list:', error);
      }
    };
  
    // Function to handle buying a ticket
    const buyTicket = async () => {
      const currentTickets = parseInt(document.getElementById('ticket-num').textContent);
  
      if (currentTickets > 0) {
        const updatedTickets = currentTickets - 1;
        document.getElementById('ticket-num').textContent = updatedTickets;
  
        // You can optionally add a sold-out class or update button text here for bonus deliverables
  
        // If you want to persist the updated tickets_sold on the server, you can make a PATCH request here
     
      } else {
        // Movie is sold out
        alert('This movie is sold out!');
      }
    };
  
    // Event listener for clicking "Buy Ticket" button
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.addEventListener('click', buyTicket);
  
    // Event listener for clicking on a movie in the menu to display its details
    const filmsList = document.getElementById('films');
    filmsList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('film')) {
        const movieId = event.target.dataset.movieId;
        const response = await fetch("http://localhost:3000/films");   
        const movieData = await response.json();
  
        const {
          title,
          runtime,
          capacity,
          showtime,
          tickets_sold,
          description,
          poster
        } = movieData;
  
        const availableTickets = capacity - tickets_sold;
  
        // Update HTML elements with selected movie details
        document.getElementById('title').textContent = title;
        document.getElementById('runtime').textContent = `${runtime} minutes`;
        document.getElementById('showtime').textContent = showtime;
        document.getElementById('film-info').textContent = description;
        document.getElementById('ticket-num').textContent = availableTickets;
        document.getElementById('poster').src = poster;
      }
    });
  
    // Call functions to fetch and display movie details and list of movies
    fetchFirstMovieDetails();
    fetchMovieList();
  });