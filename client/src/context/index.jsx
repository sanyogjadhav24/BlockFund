import React, { useContext, createContext, useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  metamaskWallet,
  useContractWrite,
  useConnect,
  useDisconnect, // ✅ Import disconnect
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract("0x44e2e90Fd522fF62d4527917490952c410F906B9");
  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");

  const rawAddress = useAddress();             // From thirdweb
  const connect = useConnect();                // Connect hook
  const disconnect = useDisconnect();          // ✅ Disconnect hook
  const [address, setAddress] = useState(null); // Local state

  // Sync local address with thirdweb address
  useEffect(() => {
    setAddress(rawAddress);
  }, [rawAddress]);

  // Connect to Metamask
  const connectWithMetamask = async () => {
    try {
      await connect(metamaskWallet());
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  // ✅ Proper Disconnect
  const disconnectWallet = () => {
    try {
      disconnect();         // Clear Thirdweb wallet session
      setAddress(null);     // Reset UI state
      console.log("Wallet disconnected");
    } catch (err) {
      console.error("Disconnect failed:", err);
    }
  };

  // Campaign Creation
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          ethers.utils.parseEther(form.target.toString()),
          Math.floor(new Date(form.deadline).getTime() / 1000),
          form.image,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.error("contract call failure", error);
    }
  };

  // Get All Campaigns
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaigns;
  };

  // Donate
  const donateToCampaign = async (pId, amount) => {
    try {
      const data = await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });
      return data;
    } catch (err) {
      console.error("Donation failed:", err);
      throw err;
    }
  };

  // Get Donators
  const getDonations = async (pId) => {
    try {
      const [donators, donations] = await contract.call("getDonators", [pId]);
      const parsedDonations = donators.map((donator, i) => ({
        donator,
        donation: ethers.utils.formatEther(donations[i].toString()),
      }));
      return parsedDonations;
    } catch (err) {
      console.error("Fetching donations failed:", err);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connectWithMetamask,
        disconnectWallet, // ✅ Now working correctly
        createCampaign: publishCampaign,
        getCampaigns,
        donateToCampaign,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
