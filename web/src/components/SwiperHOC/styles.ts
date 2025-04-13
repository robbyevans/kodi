import styled from "styled-components";
import { colors } from "../../styles/foundation";

export const StyledSwiperContainer = styled.div`
  width: 100%;
  margin-inline: auto;

  .hidden-pagination-block {
    height: 28px; /* 12px height for pagination dots + 16px spacing */
  }
  .swiper-wrapper {
    margin-bottom: 35px;
    transform: translate3d(0, 0, 0);
    .swiper-slide {
      /* width: 250px !important; */
    }
  }

  /* Pagination dots container */
  .swiper-pagination {
    height: 13px;
    margin-top: 20px; /* Margin between slides and pagination dots */
  }

  .swiper {
    width: 100%;
    .swiper-slide {
      /* Fixed width for each slide so that the next one is partly visible */
      width: 280px; /* Adjust this value based on your design */
      height: auto;
    }
  }

  /* Inactive pagination bullet style */
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background: ${colors.background}; /* Inactive dot color */
    border: 1px solid ${colors.primary};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }

  /* Active pagination bullet style */
  .swiper-pagination-bullet-active {
    background: ${colors.primary};
    border: 1px solid ${colors.primary};
  }
`;
