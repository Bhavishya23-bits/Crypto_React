import { useState, useEffect, useCallback, createContext } from "react";

export const Coin_context = createContext();

function Coin_Context_provider(props) {
  const [all_coins, setall_coins] = useState([]);
  const [currency, setcurrency] = useState({
    name: "INR",
    symbol: "₹",
  });

  const fetch_coins = useCallback(async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name.toLowerCase()}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setall_coins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  }, [currency.name]);

  useEffect(() => {
    fetch_coins();
  }, [fetch_coins]); // ✅ Correct dependency

  const value = {
    all_coins,
    currency,
    setcurrency,
  };

  return (
    <Coin_context.Provider value={value}>
      {props.children}
    </Coin_context.Provider>
  );
}

export default Coin_Context_provider;
