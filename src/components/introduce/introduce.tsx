import React from "react";
import PropTypes from "prop-types";

type Props = {};

const IntroduceComponent: React.FC<Props> = (props) => {
  return (
    <>
      <div
        className="pane-content--sec article"
        id="second"
        // cls="list-top-away"
      >
        <div className="pane-content--sec--main scrollbar mobile-hidden">
          <div className="page-about">
            <div className="page-about-content">
              <div
                className="page-about-content--section content-section--1"
              >
                <h4>RADA là gì?</h4>
                <p>
                  RADA là cộng đồng đầu tư Blockchain vận hành trên mô hình DAO.
                  Rada.Network là nền tảng để vận hành các hoạt động của các
                  Raders. Rada.Network 1.0 sẽ là phiên bản Beta đầu tiên của
                  Rada.
                </p>
                <h4>Rada Investment Platform bao gồm?</h4>
                <span>
                  <p>
                    <strong>LaunchVerse:</strong> Sản phẩm mới nhất của RADA -
                    một Launchpad dựa trên DAO cho các dự án GameFi & Metaverse
                    Blockchain.
                  </p>
                  <p>
                    <strong>Nghiên cứu:</strong> Các Rader có thể tìm thấy "Bài
                    báo Đánh giá Dự án" được Đối tác của RADA trong phần này.
                    Điều này sẽ giúp họ KHẮC PHỤC trước khi đưa ra bất kỳ quyết
                    định đầu tư nào.
                  </p>
                  <p>
                    <strong>Bài viết:</strong> Nội dung do Raders gửi về tin
                    tức, kiến ​​thức, quan điểm về Blockchain, ...
                  </p>
                  <p>
                    <strong>Về RADA:</strong> Phần này bao gồm mọi thứ bạn cần
                    biết về RADA
                  </p>
                  Rader Profile & Investment: https://rada.network/vi/dashboard
                  nơi quản lý hồ sơ Contribute và Investment Opporturnity của
                  các Raders
                </span>
                <h4>Đa ngôn ngữ: 🇻🇳 🇺🇸</h4>
              </div>
              <div
                className="page-about-content--section
                                        content-section--2"
              >
                <div className="about-social">
                  <div>
                    <i className="fab fa-facebook"></i>
                  </div>
                  <div>
                    <i className="fab fa-telegram"></i>
                  </div>
                  <div>
                    <i className="fab fa-discord"></i>
                  </div>
                  <div>
                    <i className="fab fa-twitter"></i>
                  </div>
                  <div>
                    <i className="fas fa-ad"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroduceComponent;
