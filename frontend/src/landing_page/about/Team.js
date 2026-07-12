/* eslint-disable jsx-a11y/anchor-is-valid -- placeholder "#" links used as decorative/non-navigating anchors throughout this static marketing page */
import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/srujan.png"
            alt="Srujan"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Srujan</h4>
          <h6>Co-Founder, CTO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Srujan is a technology enthusiast with a passion for building scalable solutions. He leads the engineering team at TradeLens and is responsible for driving the technical vision of the company.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="#">Homepage</a> / <a href="#">TradingQnA</a> /{" "}
            <a href="#">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
