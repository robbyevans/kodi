import React from "react";
import * as S from "./styles"; // Shorthand import for styles
import { House } from "../../redux/slices/houseSlice";

interface PropertyPageProps {
  houses: House[];
  loading: boolean;
  error: any;
  paymentData: {
    houseNumber: string;
    rentPaid: number;
    balance: number;
    paymentDate: string; // Added date of payment
    paymentMode: string; // Added mode of payment
  }[];
  downloadPDF: () => void;
}

const PropertyPage: React.FC<PropertyPageProps> = ({
  houses,
  loading,
  error,
  paymentData,
  downloadPDF,
}) => {
  if (loading) return <S.LoadingMessage>Loading...</S.LoadingMessage>;
  if (error)
    return <S.ErrorMessage>Error loading property data.</S.ErrorMessage>;

  return (
    <S.PropertyPageContainer>
      <S.Header>Houses</S.Header>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.TableHeader>House Number</S.TableHeader>
              <S.TableHeader>Tenant Name</S.TableHeader>
              <S.TableHeader>Tenant Contact</S.TableHeader>
              <S.TableHeader>Payable Rent</S.TableHeader>
              <S.TableHeader>Rent Paid</S.TableHeader>
              <S.TableHeader>Balance</S.TableHeader>
              <S.TableHeader>Date of Payment</S.TableHeader>
              <S.TableHeader>Mode of Payment</S.TableHeader>
              <S.TableHeader>Status</S.TableHeader>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => {
              const payment = paymentData.find(
                (data) => data.houseNumber === house.house_number
              );

              const rentPaid = payment?.rentPaid || 0;
              const balance = payment?.balance || house.payable_rent;
              const paymentDate = payment?.paymentDate || "N/A";
              const paymentMode = payment?.paymentMode || "N/A";
              const status = balance === 0;

              return (
                <S.TableRow key={house.id}>
                  <S.TableData>{house.house_number}</S.TableData>
                  <S.TableData>{house.tenant?.name || "Vacant"}</S.TableData>
                  <S.TableData>
                    {house.tenant?.phone_number || "Vacant"}
                  </S.TableData>
                  <S.TableData>{house.payable_rent}</S.TableData>
                  <S.TableData>{rentPaid}</S.TableData>
                  <S.TableData>{balance}</S.TableData>
                  <S.TableData>{paymentDate}</S.TableData>
                  <S.TableData>{paymentMode}</S.TableData>
                  <S.TableData>{status ? "✅" : "❌"}</S.TableData>
                </S.TableRow>
              );
            })}
          </tbody>
        </S.Table>
      </S.TableContainer>
      <S.DownloadButton onClick={downloadPDF}>Download PDF</S.DownloadButton>
    </S.PropertyPageContainer>
  );
};

export default PropertyPage;
