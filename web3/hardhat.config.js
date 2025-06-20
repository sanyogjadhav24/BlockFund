require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.4.1",
    compilerSource: "binary",


    defaultNetwork:'sepolia',
    networks:{
      hardhat:{},
      sepolia:{
        url:'https://eth-sepolia.public.blastapi.io',
        accounts:[`0x${process.env.PRIVATE_KEY}`]
      }
    },



    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  
   
  
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};




