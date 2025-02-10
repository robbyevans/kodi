import axios from "axios";

export const sendTextMessage = async (phoneNumber: string, message: string) => {
  try {
    const response = await axios.post("/api/send-sms", {
      phoneNumber,
      message,
    });
    console.log("SMS sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
};

export const sendEmailReceipt = async (email: string, receiptDetails: any) => {
  try {
    const response = await axios.post("/api/send-email", {
      email,
      subject: "Rent Payment Receipt",
      body: `
        Dear ${receiptDetails.tenantName},
        Thank you for paying rent for House ${receiptDetails.houseNumber}. 
        Your balance is KES ${receiptDetails.balance}.
      `,
    });
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
