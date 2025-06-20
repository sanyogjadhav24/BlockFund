import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../context";
import { ethers } from 'ethers';

const CampaignDetails = () => {
  const { state: campaign } = useLocation();
  const { donateToCampaign, getDonations } = useStateContext();
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonators = async () => {
      if (!campaign) return;
      const data = await getDonations(campaign.pId);
      setDonators(data);
    };
    fetchDonators();
  }, [campaign]);

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donateToCampaign(campaign.pId, amount);
      alert("Donation successful!");
      setAmount("");
    } catch (err) {
      alert("Donation failed!");
    }
    setLoading(false);
  };

  if (!campaign) return <p className="text-white">No campaign data provided.</p>;
  
  const formattedDate = new Date(campaign.deadline * 1000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const target = parseInt(campaign.target);

  return (
    <div className="min-h-screen px-4 py-10 max-w-5xl mx-auto font-inter text-white space-y-10 bg-[#0b0b0c]">
      
      {/* Section 1: Campaign Details */}
      <section className="backdrop-blur-lg bg-gradient-to-br from-[#151517] to-[#1e1e22] border border-[#2e2e2e] rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
        <h1 className="text-3xl font-bold">{campaign.title}</h1>
        <p className="text-gray-300">{campaign.description}</p>
        <img src={campaign.image} alt="campaign" className="w-full max-w-3xl rounded-lg mt-4 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-gray-400">
          <p><strong className="text-white">Target:</strong> {ethers.utils.formatEther(target.toString())} ETH</p>
          <p><strong className="text-white">Collected:</strong> {campaign.amountCollected} ETH</p>
          <p><strong className="text-white">Deadline:</strong> {formattedDate}</p>
          <p className="truncate max-w-full group">
  <strong className="text-white">Owner:</strong>{" "}
  <span className="text-gray-400 break-all group-hover:text-blue-400" title={campaign.owner}>
    {campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}
  </span>
</p>

        </div>
      </section>

      {/* Section 2: Donate ETH */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#1d1d1f] to-[#27272b] border border-[#333] rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Contribute ETH</h2>
          <form onSubmit={handleDonate} className="space-y-4">
            <input
              type="number"
              step="0.01"
              placeholder="Enter ETH amount"
              className="w-full p-3 rounded bg-[#2c2c2f] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white rounded-md font-medium transition-all"
            >
              {loading ? "Processing..." : "Donate"}
            </button>
          </form>
        </div>

        {/* Section 3: Donation History */}
        <div className="bg-gradient-to-br from-[#1d1d1f] to-[#27272b] border border-[#333] rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Donation History</h2>
          {donators.length > 0 ? (
            <ul className="space-y-3">
              {donators.map(({ donator, donation }, index) => (
                <li key={index} className="bg-[#2f2f35] p-3 rounded-md text-sm flex justify-between items-center">
                  <span className="font-mono text-gray-400">{donator.slice(0, 6)}...{donator.slice(-4)}</span>
                  <span className="text-blue-400 font-semibold">{donation} ETH</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No donations yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignDetails;
