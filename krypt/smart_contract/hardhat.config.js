// https://eth-ropsten.alchemyapi.io/v2/sYbiCB9j7tuPT9SrcENnt6v9WiL8XO21

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/sYbiCB9j7tuPT9SrcENnt6v9WiL8XO21",
      accounts: [
        "75481b09f5937ccb9dd96a349f7ef9ea7d82b9569ef1a7c9d2fd76ce380554b7",
      ],
    },
  },
};
