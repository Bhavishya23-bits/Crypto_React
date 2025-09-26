import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Coin_context } from '../../context/Coin_context'
import { Link } from 'react-router-dom'

const Home = () => {
  const { all_coins, currency } = useContext(Coin_context);
  const [display_coin, setdisplay_coin] = useState([]);
  const [input, set_input] = useState("");
  const [filter, setFilter] = useState("");

  function input_handler(event) {
    const value = event.target.value;
    set_input(value);

    if (value === "") {
      setdisplay_coin(all_coins.slice(0, 10)); 
    }
  }

  function submit_handler(event) {
    event.preventDefault();

    if (input.trim() === "") return;

    const coins = all_coins.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setdisplay_coin(coins.slice(0, 10)); 
  }

 useEffect(() => {
  let coins = [...all_coins];
  if (input !== "") {
      coins = coins.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
    }
    if (filter === "price") {
      coins.sort((a, b) => b.current_price - a.current_price);
    } 
    else if (filter === "gainers") {
      coins.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    } 
    else if (filter === "losers") {
      coins.sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    }
    setdisplay_coin(coins.slice(0, 10));
  }, [all_coins, input, filter]);
  
  if (!all_coins || all_coins.length === 0) {
    return (
      <div className="spinner">
        <div className="spin" />
        <p>Loading coins...</p>
      </div>
    );
  }

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p className='word'>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={submit_handler}>
          <input
            onChange={input_handler}
            list='coins_list'
            value={input}
            type="text"
            placeholder='Search for crypto..'
            required
          />
          <datalist id='coins_list'>
            {all_coins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
           <select
           name="filter"
           value={filter}
           onChange={(e) => setFilter(e.target.value)}>
           <option value="">Market Cap</option>
           <option value="price">Price</option>
           <option value="gainers">Top Gainers</option>
           <option value="losers">Top Losers</option>
          </select>
          <button type='submit'>Search</button>
        </form>
      </div>
      
      <div className="crypto_table">
        <div className="table_layout">
          <p>#</p>
          <p className='paisa'>Coins</p>
          <p>Price</p>
          <p>24H change</p>
          <p className='volume'>Volume</p>
          <p style={{ textAlign: "right" }} className='market_cap'>Market Cap</p>
        </div>
        {
          display_coin.map((item, index) => (
            <Link to={`/Crypto_React/${item.id}/`} className="table_layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{item.name + " - " + item.symbol.toUpperCase()}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className='volume'>{item.total_volume.toLocaleString()}</p>
              <p className='market_cap' style={{ textAlign: "right" }}>
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home;
