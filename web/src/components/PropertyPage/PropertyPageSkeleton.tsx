import React from "react";
import * as S from "./styles";

const PropertyPageSkeleton: React.FC = () => {
  // Define the headers as used in your real PropertyPage table.
  const headers = [
    "House Number",
    "Status",
    "Tenant Name",
    "Tenant Contact",
    "Payable Rent",
    "Payable Deposit",
    "Balance",
    "Account Number",
  ];
  // Define the number of rows to simulate in the table body.
  const tableRows = 4;

  return (
    <S.PropertyPageContainer data-testid="property-page-skeleton">
      {/* Header Skeleton */}
      <S.SkeletonHeader />

      {/* Download Button Skeleton */}
      <S.DownloadWRapper>
        <S.SkeletonButton />
      </S.DownloadWRapper>

      {/* Header Title Skeleton */}
      <S.Header>
        <S.SkeletonHeader style={{ width: "70%" }} />
      </S.Header>

      {/* Table Skeleton */}
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                // Use your real TableHeader style so the header colors match the live table.
                <S.TableHeader key={index}>
                  {/* A SkeletonBlock inside simulates header content */}
                  <S.SkeletonBlock width="80%" height="20px" />
                </S.TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: tableRows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((_, colIndex) => (
                  // Each cell uses the SkeletonTableData style with a SkeletonBlock inside
                  <S.SkeletonTableData key={colIndex}>
                    <S.SkeletonBlock width="90%" height="20px" />
                  </S.SkeletonTableData>
                ))}
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableContainer>

      {/* Skeleton for the "Add New House" button */}
      <S.ButtonContainer>
        <S.SkeletonButton />
      </S.ButtonContainer>
    </S.PropertyPageContainer>
  );
};

export default PropertyPageSkeleton;
