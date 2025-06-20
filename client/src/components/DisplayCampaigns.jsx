import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import { FundCard } from '.';
import { Plus } from 'lucide-react'; // optional icon for CTA

const DisplayCampaigns = ({ title = 'Live Campaigns', isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f051d] via-[#15092f] to-[#090113] text-white px-6 py-12 font-inter">
     

      {/* Campaign Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">
          {title} <span className="text-purple-400">({campaigns.length})</span>
        </h2>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <img
              src={loader}
              alt="Loading..."
              className="w-20 h-20 object-contain animate-spin"
            />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg mt-10">
            No campaigns found. Be the first to{' '}
            <span
              onClick={() => navigate('/create-campaign')}
              className="text-purple-400 underline cursor-pointer hover:text-purple-300"
            >
              create one!
            </span>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id || campaign.pId}
              className="transition transform hover:scale-105 hover:shadow-xl"
            >
              <FundCard {...campaign} handleClick={() => handleNavigate(campaign)} />
            </div>
          ))
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-24 bg-[#25104a] p-10 rounded-3xl shadow-xl text-center max-w-5xl mx-auto relative overflow-hidden border border-purple-800">
        <div className="absolute w-[300px] h-[300px] bg-purple-700 opacity-20 rounded-full blur-3xl top-[-50px] right-[-50px]" />
        <h3 className="text-2xl sm:text-3xl font-bold mb-2">Got a Vision?</h3>
        <p className="text-gray-300 mb-6">
          Launch your own blockchain-powered crowdfunding campaign in just a few clicks.
        </p>
        <button
          onClick={() => navigate('/create-campaign')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          <Plus size={20} /> Start a Campaign
        </button>
      </div>
    </div>
  );
};

export default DisplayCampaigns;
