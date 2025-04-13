import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles";

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
  className,
  spaceBetween = 13,
}) => (
  <div className={className}>
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
  </div>
);

export default SwiperHOC;
