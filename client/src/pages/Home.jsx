import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns, Navbar } from '../components';
import { landing } from '../assets';


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setFilteredCampaigns(data);
    setCampaigns(data);
    setIsLoading(false);
  };

  const handleSearch = (query) => {
    const filtered = campaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  useEffect(() => {
    window.searchCampaigns = handleSearch;
  }, [campaigns]);

  return (
    <div className="min-h-screen bg-black text-white font-inter">

      {/* Navbar */}
      <div className="px-6 py-6">
        <Navbar onSearch={handleSearch} />
      </div>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden border border-[#2f2840] rounded-3xl shadow-2xl max-w-7xl mx-auto mb-20 p-10 lg:flex items-center justify-between bg-black">

    
       

        {/* Left Hero Text */}
        <div className="max-w-2xl z-10 relative text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Transform Ideas into Reality with Web3 Crowdfunding
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Back innovations powered by blockchain. Transparent. Secure. Borderless.
          </p>
          <a
            href="/create-campaign"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
          >
            💸 Launch Your Campaign
          </a>
        </div>

        {/* Right Image */}
        <div className="mt-10 lg:mt-0 lg:ml-12 relative w-full max-w-md mx-auto lg:max-w-sm animate-fade-in-up z-10">
          <img
            src={landing}
            alt="blockchain innovation"
            className="w-full object-contain drop-shadow-[0_0_20px_rgba(128,0,255,0.6)]"
          />
        </div>
      </div>

      {/* Display Campaigns */}
      <div className="px-6 pb-12">
        <DisplayCampaigns title="All Campaigns" isLoading={isLoading} campaigns={filteredCampaigns} />
      </div>
    </div>
  );
};

export default Home;
