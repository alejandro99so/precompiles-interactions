require("dotenv").config();
const constants = require("./constantsPrecompiles.json");
const { Web3 } = require("web3");

const Interactions = {
  DeployerAllowList: "DEPLOYER_ALLOW_LIST",
  NativeMinter: "NATIVE_MINTER",
  TxAllowList: "TX_ALLOW_LIST",
  FeeManager: "FEE_MANAGER",
};

const Actions = {
  Enable: "ENABLE",
  Disable: "DISABLE",
};
const RPC = process.env.RPC;
const deployPrecompile = async (
  address,
  interaction = Interactions.DeployerAllowList,
  action = Actions.Enable
) => {
  const web3 = new Web3(RPC);
  const account = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  if (interaction == Interactions.DeployerAllowList) {
    const _contract = constants.contractDeployerAllowListConfig;
    const _abi = constants.abiAllowList;
    const contractInteraction = new web3.eth.Contract(_abi, _contract);
    if (action == Actions.Enable) {
      const enable = await contractInteraction.methods
        .setEnabled(address)
        .send({ from: account[0].address });
      console.log({ enable });
    } else if (action == Actions.Disable) {
      const disable = await contractInteraction.methods
        .setNone(address)
        .send({ from: account[0].address });
      console.log({ disable });
    }
  }
};

deployPrecompile("0xaddress");
