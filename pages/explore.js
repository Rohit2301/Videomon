import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import { useProvider } from "wagmi";
import { useSigner, useContract, useAccount } from "wagmi";

const Explore = () => {
  const context = useContext(Context);
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  useEffect(() => {
    if (provider && signer) {
      context.initSf(provider);
    }
  }, [provider, signer]);

  return <div>{context.superTokenBalance}</div>;
};

export default Explore;
