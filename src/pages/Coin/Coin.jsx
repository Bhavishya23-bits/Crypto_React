import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { Coin_context } from '../../context/Coin_context'
import Line_chart from '../../components/line_chart/line_chart';

const Coin = () => {
  const {currency}=useContext(Coin_context)
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chart_data, setchart_data] = useState(null);


const fetchCoinData = useCallback(async () => {
   const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
      const options = {
        method: 'GET',
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } 
}, [coinId]);
const fetch_chart_data = useCallback(async () => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=4&interval=daily`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setchart_data(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
}, [coinId, currency]);


  useEffect(() => {
    fetchCoinData();
    fetch_chart_data();
  }, [fetchCoinData,
    fetch_chart_data]);

if(coinData && chart_data){
  return (
    <div className='coin'>
      <div className="coin_name">
        <img src={coinData.image.large} />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className='adjust'>
      <div className="coin_chart">
        <Line_chart chart_data={chart_data} />
      </div>
      <div className="coin_info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol}{coinData.market_data.current_price[currency.name.toLowerCase()].toLocaleString()}</li>
      </ul>
        <ul>
        <li>Volume</li>
        <li>{coinData.market_data.total_volume[currency.name.toLowerCase()].toLocaleString()}</li>
      </ul>
      <ul>
        <li>Market Cap</li>
        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name.toLowerCase()].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>{currency.symbol}{coinData.market_data.high_24h[currency.name.toLowerCase()].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>{currency.symbol}{coinData.market_data.low_24h[currency.name.toLowerCase()].toLocaleString()}</li>
      </ul>
      
     </div>
    </div>
    </div>
  )
} else{
  return(
  <div className='spinner'>
        <div className="spin">
        </div>
    </div>
    )
}
};


export default Coin;
