import { useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";

interface Metadata {
  // metadata: {
  //   text: string;
  //   invoiceId: string;
  // };
  invoiceId: string;
}

export default function ReminderComponent({ invoiceId }: Metadata) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reminder, setReminder] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    handleReminder();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (reminder) {
      navigator.clipboard.writeText(reminder);
      setCopied(true);
      //   setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2s
    }
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "reminder-popover" : undefined;

  const handleReminder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-api-models-production.up.railway.app/invoices/reminder",
        {
          invoiceId: invoiceId,
        }
      );
      setReminder(response.data.reminderMessage);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        startIcon={<EmailIcon />}
        onClick={handleClick}
      >
        Generate payment reminder
      </Button>

      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ marginRight: 10 }}
      >
        {loading ? (
          <Typography sx={{ p: 2 }}>✨ Creating reminder...</Typography>
        ) : reminder ? (
          <Box>
            <Typography sx={{ p: 2, whiteSpace: "pre-wrap" }}>
              {reminder}
            </Typography>

            {/* Copy Button */}
            <Tooltip title={copied ? "Copied!" : "Copy to Clipboard"}>
              <IconButton
                onClick={handleCopy}
                sx={{ position: "absolute", top: 5, right: 5 }}
              >
                {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>

            {/* Close Button */}
            <Tooltip title={"close"}>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 5, left: 5 }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Typography sx={{ p: 2 }}>No reminder generated.</Typography>
        )}
      </Popover>
    </>
  );
}
