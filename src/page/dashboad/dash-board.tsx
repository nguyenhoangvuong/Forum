import React from "react";
import PropTypes from "prop-types";

type Props = {

}

const DashBoard: React.FC<Props> = (props) => {
  return (
    <div className="pane-center  scroll-bar">
      <div className="pane-content">
        <div className="pane-header w-100 justify-content-center d-flex flex-column">
          <img src="./assets/image/launchverse.svg" alt=""></img>
          <strong className="pane-header--title">
            DAO-based Launchpad for GameFi and MetaVerse
          </strong>
          <p className="pane-header--title-sub">
            Simplify and popularize crowdfunding in Blockchain, at the same time
            make initial Token sales equally accessible for the masses — newbies
            and veterans alike.
          </p>
        </div>
        <div className="projects-section">
          <div className="projects-section--subheader">
            <h3>Current Project</h3>
          </div>
          <div className="rounded-lg overflow-hidden">
            <div>
              <img src="./assets/image/dfh-ino.png" alt="img"></img>
            </div>
            <div className="projects-section--bottom">
              <div className="projects-section--bottom-left">
                <img src="./assets/image/defihorse.png" alt="img"></img>
              </div>
              <div className="projects-section--bottom-center">
                <span className="text-uppercase">EXCLUSIVE ON RADA</span>
                <h3>The first-ever NFT Sale of DefiHorse</h3>
                <p>
                  The super-project attracting millions of event participants
                  from Racers around the world officially opens the first round
                  of NFT sale (INO). Ready to become the proud owner of the
                  remarkable steeds?
                </p>
              </div>
              <div className="projects-section--bottom-right">
                <span>TIME UNTIL CLOSE</span>
                <a>
                  <span>View Detail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="projects-section mt-5">
          <div className="projects-section--subheader">
            <h3>FUNDED POOLS</h3>
          </div>
          <div className="project-content">
            <div className="project-content--meta">
              <div className="project-title">
                <div className="project-title--token-logo">
                  <div className="overflow-hidden">
                    <img
                      src="./assets/image/6f9858a6-4a07-4111-95cf-df0dcaf984c1.png"
                      alt="img"
                    ></img>
                  </div>
                  <div className="project-title--token-name">
                    The Parallel - Community
                  </div>
                </div>
              </div>
              <ul className="project-fields">
                <li className="list-pair">
                  <span className="list-key">Mở bán</span>
                  <span className="list-value">80.000 BUSD</span>
                </li>
                <li className="list-pair">
                  <span className="list-key">Số người tham gia</span>
                  <span className="list-value">N.A</span>
                </li>
                <li className="list-pair">
                  <span className="list-key">Tiến độ</span>
                  <span className="list-value">
                    1460500.0 <span>/80.000</span>
                  </span>
                </li>
                <li className="list-pair">
                  <span className="list-key">Kết thúc</span>
                  <span className="list-value">Dec 26, 2021</span>
                </li>
              </ul>
            </div>

            <h3 className="text-center mt-5 project-content--title">
              The LaunchVerse
              <strong className="text-center">where everyone is welcome</strong>
            </h3>
            <div className="projects-card">
              <div className="card-item">
                <div className="card-item--img">
                  <img
                    src="./assets/image/shield-hexa-dark.svg"
                    alt="img"
                  ></img>
                </div>
                <p className="card-item--des">
                  We revolutionize blockchain fundraising with our DAO-based
                  AngelList modelled Launchpad.
                </p>
              </div>
              <div className="card-item">
                <div className="card-item--img">
                  <img
                    src="./assets/image/shield-hexa-dark.svg"
                    alt="img"
                  ></img>
                </div>
                <p className="card-item--des">
                  The LaunchVerse creates high value for both startup projects
                  and the investor community.
                </p>
              </div>
              <div className="card-item">
                <div className="card-item--img">
                  <img
                    src="./assets/image/shield-hexa-dark.svg"
                    alt="img"
                  ></img>
                </div>
                <p className="card-item--des">
                  Different, diverse but united in the MetaVerse, projects
                  across all blockchains are welcome on the LaunchVerse.
                </p>
              </div>
              <div className="card-item">
                <div className="card-item--img">
                  <img
                    src="./assets/image/shield-hexa-dark.svg"
                    alt="img"
                  ></img>
                </div>
                <p className="card-item--des">
                  We provide fair and transparent initial token and nft launches
                  for projects with carefully structured allocation models.
                </p>
              </div>
              <div className="card-item">
                <div className="card-item--img">
                  <img
                    src="./assets/image/shield-hexa-dark.svg"
                    alt="img"
                  ></img>
                </div>
                <p className="card-item--des">
                  We help incubate early stage projects across the #MetaVerse
                  and #GameFi industries.
                </p>
              </div>
              <div className="card-item">
                <div className="card-item--img">
                  <img
                    src="./assets/image/shield-hexa-dark.svg"
                    alt="img"
                  ></img>
                </div>
                <p className="card-item--des">
                  We help connect projects to the world through our community
                  and innovative Share2Earn and Contribute2Earn models.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-left--title">
              Want to launch your project on RADA?
            </div>
            <div className="hero-left--btn">
              Apply for Lauch
              <i className="fa fa-envelope"></i>
            </div>
          </div>
          <div className="hero-right">
            '<img src="./assets/image/launchverse-hero.png" alt="img"></img>
          </div>
        </div>

        <div className="copy-right text-center">
          © Copyright RADA Network 2021. All rights reserved.
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = {};

export default DashBoard;
