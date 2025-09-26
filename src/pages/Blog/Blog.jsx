import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog">
      <h1>Crypto Insights & Market Updates</h1>

      <div className="blog-post">
        <h2>What Drives Cryptocurrency Prices?</h2>
        <p>
          Cryptocurrency prices are driven by a mix of market demand, investor sentiment,
          adoption, regulation, and even social media. Bitcoin, being the first and most well-known,
          often sets the trend. But factors like exchange listings, technology upgrades, and macroeconomic
          news can affect all coins. Always research before investing.
        </p>
      </div>

      <div className="blog-post">
        <h2>Top 5 Coins to Watch in 2025</h2>
        <ul className='hii'>
          <li>Bitcoin (BTC): Still the gold standard in crypto.</li>
          <li>Ethereum (ETH): Powering DeFi, NFTs, and more.</li>
          <li>Solana (SOL): High-speed, low-cost blockchain.</li>
          <li>Chainlink (LINK): Connecting smart contracts to real-world data.</li>
          <li>Polygon (MATIC): Scaling Ethereum efficiently.</li>
        </ul>
      </div>

      <div className="blog-post">
        <h2>Crypto Safety Tips</h2>
        <p>
          Always use trusted exchanges, enable two-factor authentication, and store long-term holdings in cold wallets.
          Avoid clicking unknown links and beware of “pump and dump” groups. The crypto world moves fast — stay educated and alert.
        </p>
      </div>

    </div>
  );
};

export default Blog;
