import React, { useState, useEffect, useContext } from "react";
import { Coin_context } from "../../context/Coin_context";
import "./Wishlist.css";

const Wishlist = () => {
  const { all_coins, currency } = useContext(Coin_context);

  const [wishlistCoins, setWishlistCoins] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCoins(storedWishlist);
  }, []);

  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const matches = all_coins
      .filter((coin) => coin.name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 10);
    setSuggestions(matches);
  }, [input, all_coins]);

  const addToWishlist = (coin) => {
    if (!wishlistCoins.some((c) => c.id === coin.id)) {
      const updated = [...wishlistCoins, coin];
      setWishlistCoins(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
    setInput("");
    setSuggestions([]);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlistCoins.filter((c) => c.id !== id);
    setWishlistCoins(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const sortedWishlist = [...wishlistCoins].sort((a, b) => {
    if (filter === "price") return b.current_price - a.current_price;
    if (filter === "gainers")
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    if (filter === "losers")
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    return 0;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const coin = all_coins.find(
      (c) => c.name.toLowerCase() === input.toLowerCase()
    );
    if (coin) addToWishlist(coin);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-hero">
        <h1>My Wishlist</h1>

        <form className="wishlist-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="wishlist-input-container">
            <input
              type="text"
              placeholder="Search crypto to add..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="wishlist-input"
            />
            {suggestions.length > 0 && (
              <ul className="wishlist-suggestions-dropdown">
                {suggestions.map((coin) => (
                  <li
                    key={coin.id}
                    onClick={() => addToWishlist(coin)}
                    className="wishlist-suggestion-item"
                  >
                    {coin.name} - {coin.symbol.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="wishlist-filter-select"
          >
            <option value="">Market Cap</option>
            <option value="price">Price</option>
            <option value="gainers">Top Gainers</option>
            <option value="losers">Top Losers</option>
          </select>

          <button type="submit" className="wishlist-add-btn">
            Add
          </button>
        </form>
      </div>

      <div className="wishlist-crypto-table">
        <div className="wishlist-table-layout">
          <p>#</p>
          <p className="wishlist-paisa">Coins</p>
          <p>Price</p>
          <p>24H change</p>
          <p className="wishlist-volume">Volume</p>
          <p className="wishlist-market-cap">
            Market Cap
          </p>
          <p>Action</p>
        </div>

        {sortedWishlist.length === 0 ? (
          <p style={{ padding: "1rem" }}>No coins in your wishlist.</p>
        ) : (
          sortedWishlist.map((coin) => (
            <div className="wishlist-table-layout" key={coin.id}>
              <p>{coin.market_cap_rank}</p>
              <div>
                <img src={coin.image} alt={coin.name} />
                <p>
                  {coin.name} - {coin.symbol.toUpperCase()}
                </p>
              </div>
              <p>
                {currency.symbol} {coin.current_price.toLocaleString()}
              </p>
              <p
                className={
                  coin.price_change_percentage_24h < 0
                    ? "wishlist-red"
                    : "wishlist-green"
                }
              >
                {(Math.floor(coin.price_change_percentage_24h * 100) / 100).toFixed(2)}%
              </p>
              <p className="wishlist-volume">{coin.total_volume.toLocaleString()}</p>
              <p className="wishlist-market-cap" style={{ textAlign: "right" }}>
                {currency.symbol} {coin.market_cap.toLocaleString()}
              </p>
              <button
                className="wishlist-remove-btn"
                onClick={() => removeFromWishlist(coin.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
