import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = () => {
  // Route to authenticated page
};
const ConnectWallet = () => {
  const auth = useAuth();
  const SocialLogin = async (loginType) => {
    const provider = await auth.loginWithSocial(loginType);
  };
  const Logout = async () => {
    await auth.logout();
  };
  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <div className="realtive flex">
          <p>Logged In</p>
          <div
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className="relative flex">
          <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
          <div
            onClick={() => {
              SocialLogin("Discord");
            }}
          >
            Connect using discord
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
