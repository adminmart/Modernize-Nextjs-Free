import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckIcon from "@mui/icons-material/Check";

import ReminderComponent from "./ReminderPayment";

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoiceId: string;
  metadata: {
    text: string;
    invoiceId: string;
  };
}

interface AlertI {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  status: boolean;
}

export default function InvoiceModal({
  open,
  onClose,
  invoiceId,
  metadata,
}: InvoiceModalProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertI>();
  const [chatHistory, setChatHistory] = useState<
    { sender: "User" | "AI"; text: string }[]
  >([]);

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    const userMessage: { sender: "User" | "AI"; text: string } = {
      sender: "User",
      text: query,
    };
    setChatHistory((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/invoices/details",
        {
          invoiceId: invoiceId,
          question: query,
        }
      );

      const aiResponse = response.data.answer || "No relevant answer found.";

      setChatHistory((prev) => [...prev, { sender: "AI", text: aiResponse }]);
    } catch (error) {
      console.error("Error querying AI:", error);
      setAlert({
        message: "Query failed!",
        severity: "error",
        status: true,
      });
      setChatHistory((prev) => [
        ...prev,
        { sender: "AI", text: "Failed to process the request." },
      ]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="invoice-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            width: 500,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{ marginBottom: 2 }}
            variant="h6"
            id="invoice-modal-title"
          >
            Invoice Details
          </Typography>

          {/*Generate Reminder */}
          <ReminderComponent invoiceId={invoiceId}></ReminderComponent>

          {/* Display Invoice Data */}
          <Box sx={{ mt: 2, maxHeight: 200, overflowY: "auto" }}>
            {Object.entries(metadata).map(([key, value]) => (
              <Typography key={key} variant="body1" sx={{ lineHeight: 1.6 }}>
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
          </Box>

          {/* AI Chat Interaction */}
          <List sx={{ maxHeight: 150, overflowY: "auto", mt: 2 }}>
            {chatHistory.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: msg.sender === "AI" ? "grey.100" : "primary.light",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <ListItemText primary={`${msg.sender}: ${msg.text}`} />
              </ListItem>
            ))}
          </List>

          <TextField
            fullWidth
            placeholder="Ask anything about this invoice..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSendQuery}
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={<AutoAwesomeIcon />}
          >
            Ask AI
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{ mt: 2, display: "block", margin: "auto" }}
            />
          )}
        </Box>
      </Modal>
      {alert?.status ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={alert?.severity}
        >
          {alert?.message}
        </Alert>
      ) : null}
    </>
  );
}
