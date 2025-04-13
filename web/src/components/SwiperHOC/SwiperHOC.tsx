// File: /web/src/components/SwiperHOC/SwiperHOC.tsx

import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import styled-components styles (make sure the file path is correct)
import * as S from "./styles";

type Props = {
  children: ReactNode[];
  showPaginationDots?: boolean;
  slidesPerView?: number | "auto";
  className?: string;
  spaceBetween?: number;
};

const SwiperHOC: FC<Props> = ({
  children,
  showPaginationDots = true,
  slidesPerView = "auto",
  spaceBetween = 13,
}) => (
  <S.StyledSwiperContainer>
    <Swiper
      modules={[Pagination]}
      pagination={showPaginationDots ? { clickable: true } : false}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
    >
      {children.map((child, idx) => (
        <SwiperSlide key={idx}>{child}</SwiperSlide>
      ))}
    </Swiper>
  </S.StyledSwiperContainer>
);

export default SwiperHOC;
