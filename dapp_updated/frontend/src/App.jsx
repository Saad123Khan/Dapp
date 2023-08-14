import { Fragment, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import { Mining, QA, Setup, Share } from "./pages";
import Account from "./pages/Account";
import Arbitrage from "./pages/Arbitrage";
import LandingPage from "./pages/landingpage/LandingPage";
import MarketStats from "./pages/MarketStats";
import Recharge from "./pages/Recharge";
import MiningRecord from "./pages/MiningRecord";
import Record from "./pages/Record";
import NewsPage from "./pages/NewsPage";
import Textpage from "./pages/TextPage";
import ArbitrageProductPage from "./pages/ArbitrageProductPage";
import ArbitrageRecord from "./pages/ArbitrageRecord";
import Machine from "./pages/Machine";
import NewsList from "./pages/NewsList";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import Trade from "./pages/Trade";

import { Store } from "./context/Store";
import MechineRecord from "./pages/MechineRecord";
import Google2AF from "./pages/Google2AF";
import MiningIntro from "./pages/MiningIntro";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tab, setTab] = useState("");
  const [key, setKey] = useState("Normal");

  // setting modal
  const [settingShow, setSettingShow] = useState(false);
  const handleSettingClose = () => setSettingShow(false);
  const handleSettingShow = () => setSettingShow(true);
  const { currentAccount, handle, setHandle, connectWallet } =
    useContext(Store);

  if (handle == true) {
    alert("Connect Wallet");
    window.location.reload();
  }
  const closeSideBar=()=>{
    if(sidebarOpen)
    {
      setSidebarOpen(false);
    }
  }

  return (
    <div className="App disable-zoom"  onClick={() => {
      closeSideBar()
    }}>
      {currentAccount && (
        <>
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setTab={setTab}
            handleSettingShow={handleSettingShow}
          />
          <Routes>
            <Fragment>
              <Route
                path="/"
                element={<LandingPage setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/account"
                element={<Account setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/recharge/:id"
                element={<Recharge setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/record"
                element={<Record setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/arbitrage"
                element={<Arbitrage setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/arbitrage-product/:no"
                element={
                  <ArbitrageProductPage setSidebarOpen={setSidebarOpen} />
                }
              />
              <Route
                path="/orders"
                element={
                  <Orders
                    setKey={setKey}
                    key={key}
                    setSidebarOpen={setSidebarOpen}
                  />
                }
              />
              <Route
                path="/mining"
                element={<Mining setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/mining-intro"
                element={<MiningIntro setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/miningRecord"
                element={<MiningRecord setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/qa"
                element={<QA setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/share/:walletAddress"
                // path="/share/:walletAddress"
                element={<Share setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/market-stats/:coin"
                element={
                  <MarketStats
                    setKey={setKey}
                    setSidebarOpen={setSidebarOpen}
                  />
                }
              />
              <Route
                path="/news/:id"
                element={<NewsPage setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/news-list"
                element={<NewsList setSidebarOpen={setSidebarOpen} />}
              />

              <Route
                path="/arbitrageintro"
                element={<Textpage setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/arbitragerecord"
                element={<ArbitrageRecord setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/machine/:no"
                element={<Machine setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/mechineRecord"
                element={<MechineRecord setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/auth"
                element={<Auth setSidebarOpen={setSidebarOpen} />}
              />
              <Route
                path="/trade"
                element={
                  <Trade
                    setKey={setKey}
                    activeKey={key}
                    setSidebarOpen={setSidebarOpen}
                  />
                }
              />
              <Route
                path="/google"
                element={
                  <Google2AF
                    setKey={setKey}
                    activeKey={key}
                    setSidebarOpen={setSidebarOpen}
                  />
                }
              />
            </Fragment>
          </Routes>
          {/* app setting */}
          <Setup
            settingShow={settingShow}
            handleSettingClose={handleSettingClose}
          />
        </>
      )}
    </div>
  );
}

export default App;
