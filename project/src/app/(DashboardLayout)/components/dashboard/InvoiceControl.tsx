import { useEffect, useRef, useState } from 'react';

import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import CheckIcon from '@mui/icons-material/Check';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import InvoiceModal from './InvoiceModal';

interface ResultsI {
  id: string;
  score: number;
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

export default function InvoiceControl() {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState<AlertI>();
  const [results, setResults] = useState<ResultsI[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<ResultsI | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const StyledSpan = styled("span")(({ theme }) => ({
    fontSize: theme.typography.caption.fontSize,
    marginLeft: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  }));

  // 🚀 Automatically upload when file is selected
  useEffect(() => {
    if (file) {
      actualUpload();
    }
  }, [file]);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const actualUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://ai-api-models-production.up.railway.app/invoices/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      setAlert({
        message: response.data.message,
        severity: "success",
        status: true,
      });
    } catch (error) {
      console.error("Upload error:", error);
      setAlert({
        message: "File upload failed!",
        severity: "error",
        status: true,
      });
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-api-models-production.up.railway.app/invoices/search",
        {
          query,
        }
      );
      console.log(response);
      setResults(response.data.message);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
      setQuery(" ");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Powered Invoice Control
      </Typography>
      {/* File Upload */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Limit to 10 rows per file due to demo purposes.
        </Typography>
        <Typography variant="h6">
          Upload Invoice <StyledSpan>*csv format</StyledSpan>
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileSelection}
        />
        <Button
          color="primary"
          startIcon={<FileUploadIcon />}
          variant="contained"
          onClick={handleFileUploadClick}
          sx={{ mt: 2 }}
        >
          Choose File
        </Button>

        {file && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {file.name}
          </Typography>
        )}

        {loading && query === "" && (
          <CircularProgress size={24} sx={{ ml: 2 }} />
        )}
      </Paper>

      {alert?.status ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={alert?.severity}
        >
          {alert?.message}
        </Alert>
      ) : null}

      {/* Invoice Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Search Invoice</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<ContentPasteSearchIcon />}
          onClick={handleSearch}
        >
          Find Invoice
        </Button>
        {loading && query !== "" && (
          <CircularProgress size={24} sx={{ ml: 2 }} />
        )}
      </Paper>
      {/* Results Table */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Match Score</TableCell>
              <TableCell>Metadata</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.id.split("-")}</TableCell>
                <TableCell>{(result.score * 100).toFixed(2)}%</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedInvoice(result)}
                  >
                    View Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          open={Boolean(selectedInvoice)}
          onClose={() => setSelectedInvoice(null)}
          invoiceId={selectedInvoice.id}
          metadata={JSON.parse(selectedInvoice.metadata.text)}
        />
      )}
    </Container>
  );
}
