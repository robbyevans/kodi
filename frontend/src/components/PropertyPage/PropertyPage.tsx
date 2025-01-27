import { useEffect } from "react";
import * as S from "./styles";

interface PropertyPageProps {
  houses: any[];
  loading: boolean;
  error: string | null;
  paymentData: any[];
  downloadPDF: () => void;
}

const PropertyPage: React.FC<PropertyPageProps> = ({
  houses,
  loading,
  error,
  paymentData,
  downloadPDF,
}) => {
  useEffect(() => {
    if (houses.length > 0) {
      // Optionally handle any additional logic when the page is loaded
    }
  }, [houses]);

  if (loading) return <S.LoadingMessage>Loading houses...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.PropertyPageContainer>
      <S.Header>Houses for {houses[0]?.property?.name}</S.Header>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.TableHeader>House Number</S.TableHeader>
              <S.TableHeader>Tenant Name</S.TableHeader>
              <S.TableHeader>Tenant Contact</S.TableHeader>
              <S.TableHeader>Payable Rent</S.TableHeader>
              <S.TableHeader>Rent Paid</S.TableHeader>
              <S.TableHeader>Rent Deposit</S.TableHeader>
              <S.TableHeader>Balance</S.TableHeader>
              <S.TableHeader>Date of Payment</S.TableHeader>
              <S.TableHeader>Mode of Payment</S.TableHeader>
              <S.TableHeader>Rent Cleared</S.TableHeader>
              <S.TableHeader>Status</S.TableHeader>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => {
              const paymentInfo = paymentData.find(
                (payment) => payment.id === house.id
              );
              return (
                <tr key={house.id}>
                  <S.TableData>{house.house_number}</S.TableData>
                  <S.TableData>{house.tenant?.name || "vacant"}</S.TableData>
                  <S.TableData>
                    {house.tenant?.phone_number || "vacant"}
                  </S.TableData>
                  <S.TableData>{house.payable_rent}</S.TableData>
                  <S.TableData>{paymentInfo?.rentPaid || 0}</S.TableData>
                  <S.TableData>{0}</S.TableData>
                  <S.TableData>
                    {paymentInfo ? paymentInfo.balance : house.payable_rent}
                  </S.TableData>
                  <S.TableData>{paymentInfo?.paymentDate || "N/A"}</S.TableData>
                  <S.TableData>
                    {paymentInfo?.modeOfPayment || "N/A"}
                  </S.TableData>
                  <S.TableData>
                    {paymentInfo?.balance === 0 ? "✅" : "❌"}
                  </S.TableData>
                  <S.TableData>
                    {paymentInfo?.balance === 0 ? "Cleared" : "Pending"}
                  </S.TableData>
                </tr>
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
