import React, { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Hero from "./hero";
import HowItWorks from "./how-its-work";
import RedeemPoints from "./way-to-redeem-point";
import VIPs from "./vip-table";
import WaysToEarnPoints from "./way-to-earn";
import Rewards from "./rewards";
import Loader from "./components/loader";
import useMindsSDK from "./hook/useMidsSDk";

import { ToastContainer } from "react-toastify";
import { useToast } from "./hook/useToster";
import Footer from "./components/footer";

function App() {
  const { sdk, isSdkLoaded, clientId } = useMindsSDK();
  const { notifySuccess, notifyError } = useToast();
  const redeemRef = useRef(null);
  const earnRef = useRef(null);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") || false
  );
  // eslint-disable-next-line no-unused-vars
  const [copied, setCopied] = useState(false);
  const [settingInformation, setSettingInformation] = useState({
    loading: true,
    wayToEarn: {},
    waysToRedeem: {},
    vipsTableRecords: {},
    birthdayReward: {},
    socialMediaRewards: {},
    pointsTransactions: [],
    rewards: [],
    pointBalance: {},
  });
  const [isRedeem, setIsRedeem] = useState(false);

  const getSettingInformation = useCallback(async () => {
    if (isSdkLoaded && sdk) {
      const info = await sdk.resource.getInfo();
      const { points_card, vip_card, social_media_rewards, birthday_reward } =
        info?.data?.settings;
      let rewards = {};
      let pointsTransactions = {};
      let pointsBalance = {};
      if (isLogin) {
        rewards = await sdk.resource.getRewards();
        pointsTransactions = await sdk.resource.getPointsTransactions();
        pointsBalance = await sdk.resource.getPointsBalance();
      }

      setSettingInformation({
        wayToEarn: points_card?.ways_to_earn,
        waysToRedeem: points_card?.ways_to_redeem,
        vipsTableRecords: vip_card,
        socialMediaRewards: social_media_rewards,
        birthdayReward: birthday_reward,
        pointsTransactions: pointsTransactions?.data?.points_transactions,
        rewards: rewards?.data?.rewards,
        pointBalance: pointsBalance?.data,
        loading: false,
      });
    }
  }, [isLogin, isSdkLoaded, sdk]);

  const handleClickRedeem = async (pointToRedeem) => {
    if (isSdkLoaded && sdk && isLogin) {
      const response = await sdk.resource.postRedeemPoints({
        client_customer_id: clientId,
        amount: Number(pointToRedeem),
      });
      if (response.code === 200) {
        notifySuccess(response?.message);
        setIsRedeem(!isRedeem);
      } else {
        notifyError(response?.data?.message);
      }
    }
  };

  const handleUpdateBirthday = async (date) => {
    if (isSdkLoaded && sdk) {
      const response = await sdk.resource.postUpdateCustomer({
        client_customer_id: clientId,
        customer: {
          birthday_str: date,
        },
      });
      if (response.code === 200) {
        notifySuccess(response?.message);
      } else {
        notifyError(response?.message);
      }
    }
  };

  const getSocialURLs = (type, data) => {
    switch (type) {
      case "twitter_follow": {
        return `https://twitter.com/intent/follow?region=follow_link&screen_name=${data.unique_id}`;
      }
      case "twitter_share": {
        const shareContent = encodeURIComponent(data.share_content);
        return `https://twitter.com/intent/tweet?text=${shareContent}&via=${data.unique_id}`;
      }
      case "facebook_like": {
        return `https://www.facebook.com/${data.unique_id}`;
      }
      case "facebook_share": {
        const shareContent = encodeURIComponent(data.share_content);
        return `https://www.facebook.com/sharer/sharer.php?u=${data.unique_id}&quote=${shareContent}`;
      }
      case "instagram_like": {
        return `https://www.instagram.com/${data.unique_id}`;
      }
      case "youtube_subscribe": {
        return `https://www.youtube.com/${data.unique_id}?sub_confirmation=1`;
      }
      case "tiktok_follow": {
        return `https://www.tiktok.com/${data.unique_id}?`;
      }
      default:
        return <>Type invalid</>;
    }
  };

  const handleSocialMedia = async (title, record) => {
    if (isSdkLoaded && sdk && isLogin) {
      const response = await sdk.resource.postSocialMediaRewards({
        client_customer_id: clientId,
        type: title?.toUpperCase(),
      });
      if (response.code === 200) {
        notifySuccess(response?.data?.message);
        const url = getSocialURLs(title, record);
        window.open(url, "_blank");
      } else {
        notifyError(response?.message);
      }
      setIsRedeem(!isRedeem);
    }
  };

  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        notifySuccess("Copied!");
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };
  useEffect(() => {
    getSettingInformation();
  }, [getSettingInformation, isRedeem]);

  const handleSignIn = () => {
    localStorage.setItem("isLogin", true);
    setIsLogin(true);
  };
  const scrollToRedeem = () => {
    redeemRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToEarn = () => {
    earnRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <React.Fragment>
      <Header isLogin={isLogin} handleLogout={handleLogout} />
      <Hero
        handleSignIn={handleSignIn}
        isLogin={isLogin}
        scrollToRedeem={scrollToRedeem}
        scrollToEarn={scrollToEarn}
      />
      <HowItWorks isLogin={isLogin}/>
      {settingInformation?.loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {isLogin && (
            <Rewards
              pointsTransactions={settingInformation?.pointsTransactions}
              rewards={settingInformation?.rewards}
              pointBalance={settingInformation?.pointBalance}
              handleCopy={handleCopy}
            />
          )}
          {settingInformation?.wayToEarn && (
            <div ref={earnRef}>
              <WaysToEarnPoints
                wayToEarn={settingInformation?.wayToEarn}
                socialMediaRewards={settingInformation?.socialMediaRewards}
                birthdayReward={settingInformation?.birthdayReward}
                handleUpdateBirthday={handleUpdateBirthday}
                handleSocialMedia={handleSocialMedia}
                isLogin={isLogin}
                handleSignIn={handleSignIn}
              />
            </div>
          )}
          {settingInformation?.waysToRedeem && (
            <div ref={redeemRef}>
              <RedeemPoints
                data={settingInformation?.waysToRedeem}
                pointBalance={settingInformation?.pointBalance?.point_balance}
                handleClickRedeem={handleClickRedeem}
                isLogin={isLogin}
              />
            </div>
          )}
          {settingInformation?.vipsTableRecords && (
            <VIPs data={settingInformation?.vipsTableRecords} />
          )}
          <ToastContainer />
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default App;
