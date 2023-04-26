import React from "react";
import microsoft from "../assets/microsoft.svg";
import Button from "../components/button/Button";

const PreviewScreen = () => {
  return (
    <div>
      <Button primary active>
        Button
      </Button>
      <Button primary danger>
        Button
      </Button>
      <Button secondary active>
        Button
      </Button>
      <Button secondary danger>
        Button
      </Button>
      <Button className="!text-black font-normal" small rounded>
        Restaurant
      </Button>
      <Button className="font-normal" small active rounded>
        Restaurant
      </Button>
      <Button className="!text-black" small rounded>
        EDIT INFO
      </Button>
      <Button small warning rounded>
        LOG OUT
      </Button>
      <Button
        className="!text-black !bg-transparent border border-primary-400"
        icon={microsoft}
        primary
        rounded
      >
        Sign in with Microsoft
      </Button>
    </div>
  );
};

export default PreviewScreen;
