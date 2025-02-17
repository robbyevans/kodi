import React from "react";
import * as S from "./styles";

const PropertyPageSkeleton: React.FC = () => {
  return (
    <S.PropertyPageContainer>
      <S.SkeletonHeader />
      <S.TableContainer>
        <S.SkeletonTable>
          <thead>
            <tr>
              {/** Render 12 header skeleton cells */}
              {Array.from({ length: 12 }).map((_, index) => (
                <S.SkeletonTableHeader key={index} />
              ))}
            </tr>
          </thead>
          <tbody>
            {/** Render 5 rows (adjust as needed) */}
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 12 }).map((_, cellIndex) => (
                  <S.SkeletonTableData key={cellIndex} />
                ))}
              </tr>
            ))}
          </tbody>
        </S.SkeletonTable>
      </S.TableContainer>
    </S.PropertyPageContainer>
  );
};

export default PropertyPageSkeleton;
