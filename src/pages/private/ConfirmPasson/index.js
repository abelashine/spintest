import React, { useEffect, useState } from "react";
import { confirmPassonGiveaway } from "../../../api";
import { Mixpanel } from "../../../services/Mixpanel";

import PaymentModal from "../../../components/Modal/PaymentModal";

export default ({ location: { search }, history }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [uniqueLinks, setUniqueLinks] = useState([]);
  const [status, setStatus] = useState(null);
  const params = new URLSearchParams(search);
  const token = params.get("token");
  const productLink = params.get("productLink");

  useEffect(() => {
    if (token && productLink) {
      confirmPassonGiveaway({ token, productLink }).then((response) => {
        if (response.response && response.response.status === "successful") {
          setIsModalOpened(true);
          setStatus("success");
          setUniqueLinks(response.response.uniqueLinks);
          Mixpanel.track("Confirm Giveaway");
        } else {
          setIsModalOpened(true);
          setStatus("failed");
        }
      });
    }
  }, [token, productLink]);

  return (
    <div>
      {status && (
        <PaymentModal
          isOpened={isModalOpened}
          isPassOn={status === "success"}
          isFailed={status === "failed"}
          uniqueLinks={uniqueLinks}
        />
      )}
    </div>
  );
};
