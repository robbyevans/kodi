import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useProperties } from "../redux/hooks/useProperties";
import * as S from "../components/PropertyPage/styles";
import PropertyPage from "../components/PropertyPage/PropertyPage";

const PropertyContainer = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const {
    getPropertyById,
    data: propertyData,
    loading,
    error,
  } = useProperties();

  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
    }
  }, [propertyId, getPropertyById]);

  const selectedProperty = propertyData.find(
    (property) => property.id === Number(propertyId)
  );
  const houses = selectedProperty?.houses || [];

  // Table header names (12 columns)
  const tableHeaders = [
    "House Number",
    "Tenant Name",
    "Tenant Contact",
    "Payable Deposit",
    "Deposit Paid",
    "Deposit Balance",
    "Payable Rent",
    "Rent Paid",
    "Balance",
    "Date of Payment",
    "Mode of Payment",
    "Status",
  ];

  // Helper function to generate table row data (without the total column)
  const generateTableData = (housesData: typeof houses) =>
    housesData.map((house) => {
      const payableDeposit = house.payable_deposit ?? "";
      const depositPaid = house.tenant?.house_deposit_paid ?? "";
      const depositBalance =
        house.payable_deposit != null &&
        house.tenant?.house_deposit_paid != null
          ? house.payable_deposit - house.tenant.house_deposit_paid
          : "";

      const payableRent = house.payable_rent ?? "";
      const rentPaidRaw = house.tenant?.rent_paid;
      const rentPaid = rentPaidRaw ?? "";
      const rentBalance =
        house.payable_rent != null && house.tenant?.rent_paid != null
          ? house.payable_rent - house.tenant.rent_paid
          : "";

      return [
        house.house_number || "",
        house.tenant?.name || "Vacant",
        house.tenant?.phone_number || "Vacant",
        payableDeposit,
        depositPaid,
        depositBalance,
        payableRent,
        rentPaid,
        rentBalance,
        house.tenant?.date_of_payment || "",
        house.tenant?.mode_of_payment || "",
        house.tenant?.status || "",
      ];
    });

  // Calculate the total rent paid for all houses
  const totalRentPaid = houses.reduce((acc, house) => {
    const rentPaid = Number(house.tenant?.rent_paid) || 0;
    return acc + rentPaid;
  }, 0);

  const downloadPDF = useCallback(() => {
    // Create a new jsPDF document in landscape with "px" as the unit
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    // Define fixed margins in pixels
    const marginLeft = 30;
    const marginRight = 30;
    const pageWidth = doc.internal.pageSize.getWidth(); // in pixels
    const availableWidth = pageWidth - marginLeft - marginRight;

    // Define fixed pixel column widths for 12 columns.
    // Adjust these values so that the total does not exceed availableWidth.
    const columnWidths = {
      0: 40, // House Number
      1: 70, // Tenant Name
      2: 60, // Tenant Contact
      3: 40, // Payable Deposit
      4: 40, // Deposit Paid
      5: 40, // Deposit Balance
      6: 40, // Payable Rent
      7: 40, // Rent Paid
      8: 40, // Balance
      9: 40, // Date of Payment
      10: 40, // Mode of Payment
      11: 40, // Status
    };

    // Calculate the total table width based on fixed pixel widths
    const totalTableWidth = Object.values(columnWidths).reduce(
      (sum, width) => sum + width,
      0
    );

    // Add title and subtitle in pixels
    const title = selectedProperty?.name || "Property Details";
    const subtitle = "Houses and Tenants Information";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(title, marginLeft, 50);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(subtitle, marginLeft, 70);

    const tableData = generateTableData(houses);

    // Create the table with autoTable and add a footer row for the total Rent Paid
    doc.autoTable({
      startY: 90,
      margin: { left: marginLeft, right: marginRight },
      tableWidth: totalTableWidth, // using fixed total width in pixels
      head: [tableHeaders],
      body: tableData,
      // The "foot" property defines a footer row.
      // In this example:
      // - The first cell spans 7 columns and displays the label.
      // - The next cell displays the total rent paid.
      // - The remaining 4 cells are left blank.
      foot: [
        [
          {
            content: "Total Rent Paid",
            colSpan: 7,
            styles: { halign: "left", fontStyle: "bold" },
          },
          {
            content: totalRentPaid.toString(),
            styles: { halign: "center", fontStyle: "bold" },
          },
          "",
          "",
          "",
          "",
        ],
      ],
      styles: {
        fontSize: 8,
        cellPadding: 5,
        halign: "center",
        valign: "middle",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        cellPadding: 5,
        fillColor: [230, 230, 230],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        fontSize: 9,
      },
      // Apply the fixed pixel column widths
      columnStyles: {
        0: { cellWidth: columnWidths[0] },
        1: { cellWidth: columnWidths[1] },
        2: { cellWidth: columnWidths[2] },
        3: { cellWidth: columnWidths[3] },
        4: { cellWidth: columnWidths[4] },
        5: { cellWidth: columnWidths[5] },
        6: { cellWidth: columnWidths[6] },
        7: { cellWidth: columnWidths[7] },
        8: { cellWidth: columnWidths[8] },
        9: { cellWidth: columnWidths[9] },
        10: { cellWidth: columnWidths[10] },
        11: { cellWidth: columnWidths[11] },
      },
      // Set a minimum cell height in pixels for readability
      minCellHeight: 25,
      didParseCell: (data) => {
        // Example: Highlight the "Deposit Balance" (column index 5) in red if it has a value.
        if (data.column.index === 5 && data.cell.raw !== "") {
          data.cell.styles.textColor = [255, 0, 0];
        }
      },
    });

    // Add a footer with the generation date
    const formattedDate = new Date().toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const finalY = doc.lastAutoTable.finalY || 90;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, marginLeft, finalY + 30);

    doc.save(`${formattedDate}-Property-Details.pdf`);
  }, [houses, selectedProperty, totalRentPaid]);

  return (
    <S.PropertyPageContainer>
      <PropertyPage
        houses={houses}
        propertyName={selectedProperty?.name || ""}
        loading={loading}
        error={error}
        propertyId={Number(propertyId)}
        downloadPDF={downloadPDF}
      />
    </S.PropertyPageContainer>
  );
};

export default PropertyContainer;
