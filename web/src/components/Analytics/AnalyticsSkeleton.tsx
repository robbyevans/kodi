import React from "react";
import * as S from "./styles";

const AnalyticsSkeleton: React.FC = () => {
  return (
    <S.AnalyticsContainer data-testid="analytics-skeleton">
      {/* Analytics Header Skeleton */}
      <S.AnalyticsHeader>
        <S.SkeletonBlock width="40%" height="36px" marginBottom="8px" />
        <S.SkeletonBlock width="25%" height="20px" />
      </S.AnalyticsHeader>

      {/* Stats Cards Skeleton */}
      <S.StatsContainer>
        {[1, 2, 3].map((item) => (
          <S.StatCard key={item}>
            <S.SkeletonBlock width="60%" height="18px" marginBottom="8px" />
            <S.SkeletonBlock width="50%" height="28px" marginBottom="8px" />
            <S.SkeletonBlock width="40%" height="16px" />
            {/* Payment Rate Badge Skeleton – positioned absolutely */}
            <S.PaymentRateBadge rate={0}>
              <S.SkeletonBlock width="40px" height="20px" />
            </S.PaymentRateBadge>
          </S.StatCard>
        ))}
      </S.StatsContainer>

      {/* Section Title Skeleton */}
      <S.SectionTitle>
        <S.SkeletonBlock width="30%" height="28px" />
      </S.SectionTitle>

      {/* Table Skeleton */}
      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              {["ID", "Desc", "Date", "Amount", "Status"].map((_, i) => (
                <th key={i}>
                  <S.SkeletonBlock width="80px" height="20px" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <td key={colIndex}>
                    <S.SkeletonBlock width="80px" height="20px" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>

      {/* Download Button Skeleton */}
      <S.DownloadButton>
        <S.SkeletonBlock width="150px" height="36px" />
      </S.DownloadButton>

      {/* Another Section Title Skeleton (for Withdrawal section, for example) */}
      <S.SectionTitle>
        <S.SkeletonBlock width="25%" height="28px" />
      </S.SectionTitle>

      {/* Placeholder for the Withdrawal Form or additional section */}
      <div style={{ marginTop: "16px" }}>
        <S.SkeletonBlock width="100%" height="200px" />
      </div>
    </S.AnalyticsContainer>
  );
};

export default AnalyticsSkeleton;
