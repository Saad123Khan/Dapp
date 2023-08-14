import { ethers, utils } from "ethers";
import { useState, useEffect, createContext } from "react";
import { usdc, usdt, contractAbi } from "../utils/constants";
import tokenAddress from "../contractsData/token-address.json";
import tokenAbi from "../contractsData/token.json";
import constractAddress from "../contractsData/stakingContract-address.json";
import contract from "../contractsData/stakingContract.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FirebaseStack from "../firebase";
import { ref, get, child, set } from "firebase/database";

export const Store = createContext();

const getEthereumContract = (address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const getwallet = new ethers.Contract(address, contractAbi, signer);
  return getwallet;
};
const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const vendingMachineContract = new ethers.Contract(
    tokenAddress.address,
    tokenAbi.abi,
    signer
  );
  return vendingMachineContract;
};

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const vendingMachineContract = new ethers.Contract(
    constractAddress.address,
    contract.abi,
    signer
  );
  return vendingMachineContract;
};

const { ethereum } = window;
export const StoreProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [handle, setHandle] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [balanceOfUsdtState, setBalanceOfUsdtState] = useState("");
  const [balanceOfUsdcState, setBalanceOfUsdcState] = useState("");
  const [balanceOfEthState, setBalfEthState] = useState("");
  const [amount, setAmount] = useState("");
  const [allowance, setAllowance] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkIsWalletConnected();
  }, []);

  ethereum.on("accountsChanged", async (account) => {
    setCurrentAccount(account[0]);
  });

  const checkIsWalletConnected = async () => {
    try {
      if (!ethereum) return alert("please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // console.log("Account", accounts[0]);
      } else {
        // console.log("No account Found");
      }
    } catch (err) {
      throw new Error("No ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts?.code == 4001) {
        throw new Error("No ethereum object");
      }
      setCurrentAccount(accounts[0]);
      console.log("END");
    } catch (err) {
      setHandle(true);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const dbRef = ref(FirebaseStack());
  const [arbitrageHostedMachine, setArbitrageHostedMachine] = useState([]);
  const [miningHostedMachine, setMiningHostedMachine] = useState([]);
  const [entrustMachine, setEntrustMachine] = useState([]);

  const getWalletAddressFromFireStoreTest = async () => {
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}`)
      );

      if (snapshot.exists()) {
      } else {
        storeDataInFirebase(currentAccount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const WalletStore = [
    {
      wallet: currentAccount,
      amount: 100000000,
    },
  ];

  const storeDataInFirebase = async (data) => {
    try {
      await set(child(dbRef, `WalletAddressAndAmount/${data}`), WalletStore);
      console.log("Data stored successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const detailsForArbitrageMachine = async () => {
    try {
      const snapshot = await get(
        child(
          dbRef,
          `WalletAddressAndAmount/${currentAccount}/Arbitrage/current`
        )
      );
      if (snapshot.exists()) {
        setArbitrageHostedMachine(snapshot.val());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const detailsForMiningMachine = async () => {
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/Mining/current`)
      );
      if (snapshot.exists()) {
        setMiningHostedMachine(snapshot.val());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const detailsForEntrustMachine = async () => {
    try {
      const snapshot = await get(
        child(dbRef, `WalletAddressAndAmount/${currentAccount}/Entrust/current`)
      );
      if (snapshot.exists()) {
        setEntrustMachine(snapshot.val());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    balanceOfUsdc(usdc);
    balanceOfUsdt(usdt);
    balanceOfEth();
    getWalletAddressFromFireStoreTest();
    detailsForArbitrageMachine();
    detailsForMiningMachine();
  }, [currentAccount]);

  const balanceOfUsdc = async () => {
    const res = await getEthereumContract(usdc).balanceOf(currentAccount);
    setBalanceOfUsdcState(ethers.utils.formatUnits(res, "ether"));
  };

  const balanceOfUsdt = async () => {
    const res = await getEthereumContract(usdt)?.balanceOf(currentAccount);
    setBalanceOfUsdtState(ethers.utils.formatUnits(res, "ether"));
  };

  const balanceOfEth = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balanceOfEth = await provider.getBalance(currentAccount);
    setBalfEthState(ethers.utils.formatUnits(balanceOfEth, "ether"));
  };

  //Here is call the fucntions
  const allowanceCheek = async () => {
    let allwance = await getTokenContract()?.allowance(
      currentAccount,
      "0xA2FB1C70c55E408eAE031bEBcEDf30bf0F2ef9DB"
    );
    console.log("hey", allwance.toString());
    setAllowance(allwance);
  };

  const HostingNow = async () => {
    try {
      setLoading(true);
      let value = ethers.utils.parseEther(amount);
      let bal = await getTokenContract()?.balanceOf(currentAccount);
      console.log(bal.toString());
      if (bal >= value) {
        const res = await getTokenContract()?.approve(
          constractAddress.address,
          value
        );
        await res.wait();
        await getContract()?.Staking(tokenAddress.address, value);
        alert("Congrates your Token Staked");
        setAmount("");
        setLoading(false);
        navigate("/");
      } else {
        alert("you Dont have balance");
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const Mining = async () => {
    try {
      setLoading(true);
      //TODO:: change the price value Here
      let value = ethers.utils.parseEther("5");
      let bal = await getTokenContract()?.balanceOf(currentAccount);
      console.log(bal.toString());
      if (bal >= value) {
        const res = await getTokenContract()?.approve(
          constractAddress.address,
          value
        );
        await res.wait();
        await getContract()?.Staking(tokenAddress.address, value);
        alert("Congrates your Token Staked");
        setLoading(false);
        navigate("/");
      } else {
        alert("you Dont have balance");
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const Approve = async () => {
    try {
      setLoading(true);
      // let value = await getTokenContract()?.totalSupply();
      let value = ethers.utils.parseEther(
        "10000000000000000000000000000000000000000000000000000000000000000000000000000"
      );
      console.log("value", value.toString());
      const res = await getTokenContract()?.approve(
        "0xA2FB1C70c55E408eAE031bEBcEDf30bf0F2ef9DB",
        value.toString()
      );
      await res.wait();
      alert("Congrates you Are Register");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allowanceCheek();
  }, [currentAccount]);

  return (
    <Store.Provider
      value={{
        allowance,
        Approve,
        loading,
        Mining,
        setAmount,
        HostingNow,
        connectWallet,
        currentAccount,
        handle,
        setHandle,
        balanceOfUsdcState,
        balanceOfUsdtState,
        balanceOfEthState,
        amount,
        arbitrageHostedMachine,
        miningHostedMachine,
        entrustMachine,
        detailsForArbitrageMachine,
        detailsForMiningMachine,
        detailsForEntrustMachine,
      }}
    >
      {children}
    </Store.Provider>
  );
};
