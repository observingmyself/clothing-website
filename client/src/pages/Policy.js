import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="text-center fw-bold">Privacy Policy</h1>
          <ul className="mt-3">
            <li>
              <h6> Personal Data </h6>
              Personally identifiable information, such as your name, shipping
              address, email address, telephone number, and demographic
              information, such as your age, gender, hometown, and interests,
              that you voluntarily give to us when you register with the Site or
              when you choose to participate in various activities related to
              the Site, such as online chat and message boards.
            </li>
            <li>
              <h6> Payment Information </h6>
              If you purchase products or services from the Site, we collect
              billing and credit card information. This information is used to
              complete the purchase transaction.
            </li>
            <li>
              <h6> Derivative Data</h6>
              Information our servers automatically collect when you access the
              Site, such as your IP address, your browser type, your operating
              system, your access times, and the pages you have viewed directly
              before and after accessing the Site.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
