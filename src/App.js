import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seatSelected, setSeatSelected] = useState([]);
  const [movieSelected, setMovieSelected] = useState({
    value: '',
  });

  useEffect(() => {
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    const selectedSeats = JSON.parse(localStorage.getItem('seatSelected'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });

      setSeatSelected(selectedSeats);
    }

    const selectedMovieIndex = localStorage.getItem('movieSelected');
    if (selectedMovieIndex !== null) {
      setMovieSelected({ value: selectedMovieIndex });
    }
  }, []);

  const saveLocalStorage = function (name, item) {
    localStorage.setItem(name, item);
  };
  const setMovieData = function (e) {
    setMovieSelected({ value: parseInt(e.target.value) });
    saveLocalStorage('movieSelected', e.target.value);
  };

  const updateSelectedCountAndTotal = function () {
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) =>
      [...seats].indexOf(seat)
    );
    setSeatSelected(seatsIndex);
    saveLocalStorage('seatSelected', JSON.stringify(seatsIndex));
  };

  const handleClick = function (e) {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');
      updateSelectedCountAndTotal();
    }
  };

  return (
    <div id='app'>
      <div className='movie-container'>
        <label>Pick a movie:</label>
        <select value={movieSelected.value} onChange={setMovieData}>
          <option disabled value=''>
            Select one option
          </option>
          <option value='10'>Avengers ($10)</option>
          <option value='20'>Terminator($20)</option>
          <option value='8'>Joker ($8)</option>
          <option value='9'>Lion king ($9)</option>
        </select>
      </div>
      <ul className='showcase'>
        <li>
          <div className='seat'></div>
          <small>N/A</small>
        </li>
        <li>
          <div className='seat selected'></div>
          <small>Selected</small>
        </li>
        <li>
          <div className='seat occupied'></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className='container' onClick={handleClick}>
        <div className='screen'></div>
        <div className='row'>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat occupied'></div>
          <div className='seat'></div>
          <div className='seat'></div>
        </div>
        <div className='row'>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat occupied'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
        </div>
        <div className='row'>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat occupied'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
        </div>
        <div className='row'>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat occupied'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
        </div>
        <div className='row'>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat occupied'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
        </div>
        <div className='row'>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat'></div>
          <div className='seat occupied'></div>
          <div className='seat'></div>
          <div className='seat'></div>
        </div>
      </div>

      <p className='text'>
        You have selected {seatSelected.length} seats for a price of $
        {seatSelected.length * movieSelected.value}
      </p>
    </div>
  );
}

export default App;
