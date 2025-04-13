// File: /web/src/components/SwiperHOC/styles.ts

import styled from "styled-components";

export const StyledSwiperContainer = styled.div`
  width: 100%;
  margin-inline: auto;

  .hidden-pagination-block {
    height: 28px; /* 12px height for pagination dots + 16px spacing */
  }

  .swiper-pagination {
    height: 13px;
    margin-top: 20px; /* Added margin to separate pagination dots from the cards */
  }

  .swiper {
    width: 100%;
    .swiper-slide {
      width: auto;
      height: auto;
    }
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
`;
