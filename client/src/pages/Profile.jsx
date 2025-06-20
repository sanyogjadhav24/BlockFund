import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { ethers } from "ethers";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const [receivedDonations, setReceivedDonations] = useState([]);

  const { address, contract, getCampaigns, getDonations } = useStateContext();

  const fetchProfileData = async () => {
    setIsLoading(true);
    const allCampaigns = await getCampaigns();
    const myCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner.toLowerCase() === address.toLowerCase()
    );
    const donated = [];
    const received = [];

    for (let campaign of allCampaigns) {
      const donations = await getDonations(campaign.pId);
      for (let d of donations) {
        if (d.donator.toLowerCase() === address.toLowerCase()) {
          donated.push({ title: campaign.title, amount: d.donation });
        }
        if (campaign.owner.toLowerCase() === address.toLowerCase()) {
          received.push({ title: campaign.title, amount: d.donation });
        }
      }
    }

    setCampaigns(myCampaigns);
    setDonatedCampaigns(donated);
    setReceivedDonations(received);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && address) fetchProfileData();
  }, [contract, address]);

  const totalDonated = donatedCampaigns.reduce((acc, d) => acc + parseFloat(d.amount), 0);
  const totalReceived = receivedDonations.reduce((acc, d) => acc + parseFloat(d.amount), 0);

  return (
    <div className="p-8 bg-gradient-to-b from-[#1f0036] to-[#000212] text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Manage your Campaigns and Track your Impact</h1>
      <p className="text-gray-300 mb-10"></p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#6f42c1]/20 p-6 rounded-xl shadow text-center">
          <h2 className="text-3xl font-bold">{campaigns.length}</h2>
          <p className="text-purple-300">Active Campaigns</p>
        </div>
        <div className="bg-[#0dcaf0]/20 p-6 rounded-xl shadow text-center">
          <h2 className="text-3xl font-bold">{totalDonated.toFixed(2)} ETH</h2>
          <p className="text-cyan-300">Total Donated</p>
        </div>
        <div className="bg-[#20c997]/20 p-6 rounded-xl shadow text-center">
          <h2 className="text-3xl font-bold">{totalReceived.toFixed(2)} ETH</h2>
          <p className="text-green-300">Total Raised</p>
        </div>
        <div className="bg-[#ffc107]/20 p-6 rounded-xl shadow text-center">
          <h2 className="text-3xl font-bold">{donatedCampaigns.length}</h2>
          <p className="text-yellow-300">Campaigns Supported</p>
        </div>
      </div>

      {/* My Campaigns */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">My Campaigns</h2>
        </div>
        <DisplayCampaigns title="" isLoading={isLoading} campaigns={campaigns} />
      </div>

      {/* Donations Made & Received */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#28203e] p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Donations I Made</h3>
          {donatedCampaigns.length ? (
            <ul className="space-y-3">
              {donatedCampaigns.map((d, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-[#3c2e5a] p-3 rounded-lg"
                >
                  <span className="text-white font-medium">{d.title}</span>
                  <span className="text-blue-300">{parseFloat(d.amount).toFixed(2)} ETH</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No donations made yet.</p>
          )}
        </div>
        <div className="bg-[#20324f] p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Donations I Received</h3>
          {receivedDonations.length ? (
            <ul className="space-y-3">
              {receivedDonations.map((d, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-[#2b416d] p-3 rounded-lg"
                >
                  <span className="text-white font-medium">{d.title}</span>
                  <span className="text-green-300">+{parseFloat(d.amount).toFixed(2)} ETH</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No donations received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
