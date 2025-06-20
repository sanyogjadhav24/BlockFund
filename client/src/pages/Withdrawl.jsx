import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context'; // assumes Web3 context
import { ethers } from 'ethers';

const Withdrawl = () => {
  const { contract, address, getCampaigns } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter campaigns created by the logged-in wallet
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const all = await getCampaigns();
    const userCampaigns = all.filter((c) => c.owner.toLowerCase() === address.toLowerCase());
    setCampaigns(userCampaigns);
    setIsLoading(false);
  };

  const handleWithdraw = async (campaignId, amount) => {
    if (!withdrawAddress || !ethers.utils.isAddress(withdrawAddress)) {
      alert("Please enter a valid wallet address.");
      return;
    }

    try {
      setIsLoading(true);
      await contract.withdraw(campaignId, withdrawAddress); // make sure your contract has this method
      alert('Withdrawal successful!');
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      alert('Error during withdrawal.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract, address]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Withdraw Funds</h2>

      <input
        type="text"
        className="w-full p-2 border rounded mb-6"
        placeholder="Enter your wallet address to receive funds"
        value={withdrawAddress}
        onChange={(e) => setWithdrawAddress(e.target.value)}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        campaigns.map((campaign, idx) => (
          <div
            key={idx}
            className="border p-4 rounded mb-4 shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{campaign.title}</h3>
              <p className="text-sm">Raised: {ethers.utils.formatEther(campaign.amountCollected)} ETH</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
              onClick={() => handleWithdraw(campaign.pId, campaign.amountCollected)}
            >
              Withdraw
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Withdrawl;
