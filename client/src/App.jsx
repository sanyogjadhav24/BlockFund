import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components';

import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import VoiceAgent from './components/VoiceAgent';
import Withdrawl from './pages/Withdrawl';

const App = () => {
  return (
  <div>
      {/* 🌓 Global Theme Wrapper */}
      <div className="bg-white dark:bg-[#0f051d] text-black dark:text-white transition-colors duration-300 min-h-screen">
        <div className="relative sm:p-8 p-4 flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/withdrawl" element={<Withdrawl/>}/>
              <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            </Routes>
            <VoiceAgent/>
          </div>
        </div>
      </div>
</div>
  );
};

export default App;
