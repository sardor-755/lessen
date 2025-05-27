import {  useEffect, useState } from "react";
import "./App.css";

function App() {
  const [coin, setCoin] = useState(0);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [boost, setBoost] = useState(6500);
  const [isDisabled, setIsDisabled] = useState(false);
  const [level, setLevel] = useState(1);
  const [coinPerTap,setCoinPerTap]=useState(1)
  function handleClick(e) {
    if (!isDisabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setShowPlusOne(true);
      setTimeout(() => {
        setShowPlusOne(false);
      }, 500);
      setCoin(coin + coinPerTap);
      boostCalc();
      if(coin==20){
        setLevel(level+1);
        setCoinPerTap(coinPerTap+2);
      }
      if(coin>99 && level==2){
        setLevel(level+1);
        setCoinPerTap(coinPerTap+2);
      }
    }
  }
  function boostCalc() {
    if (boost - coinPerTap < coinPerTap) {
      setBoost(boost - coinPerTap);
      setIsDisabled(true);
    } else {
      setBoost(boost - coinPerTap);
    }
  }
    useEffect(() => {
    const interval = setInterval(() => {
      setBoost((prevBoost) => (prevBoost < 6500 ? prevBoost + 3 : 6500));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <div className="box">
        <h2>Hamster Kombat</h2>
        <div className="header">
          <div className="header-box">
            <h3>Earn per tap</h3>
            <img src="./coin.png" alt="coin" /> <span>+{coinPerTap}</span>
          </div>
          <div className="header-box">
            <h3>Your Level</h3>
            <img src="./coin.png" alt="coin" /> <span>{level}</span>
          </div>
          <div className="header-box">
            <h3>Profit per hour</h3>
            <img src="./coin.png" alt="coin" /> <span>+1</span>
          </div>
        </div>
        <div className="hamster-main">
          <h1>
            <img src="./coin2.png" alt="" />
            {coin}
          </h1>
          <div style={{ position: "relative" }}>
            <button className="hamster-btn" onClick={handleClick}>
              <img src="./hamster.png" alt="sd" />
            </button>
            {showPlusOne && (
              <span
                style={{
                  position: "absolute",
                  left: clickPosition.x,
                  top: clickPosition.y - 50,
                  color: "orangered",
                  fontWeight: "bold",
                  fontSize: "24px",
                  animation: "floatUp 0.5s ease-out",
                  pointerEvents: "none",
                }}
              >
                +{coinPerTap}
              </span>
            )}
          </div>
          <div className="boost">
            <h3>
              <img src="./Vector.png" alt="" />
              {boost} / 6500
            </h3>
            <h4>Boost</h4>
          </div>
        </div>

        <div className="hamster-footer">
          <div className="footer-menu">
            <img src="./Union.png" alt="" />
            <p>Exchange</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-gavel"></i>
            <p>Mine</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-users"></i>
            <p>Friends</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-coins"></i>
            <p>Earn</p>
          </div>
          <div className="footer-menu">
            <img src="./airdrop.png" alt="" />
            <p>Airdrop</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;