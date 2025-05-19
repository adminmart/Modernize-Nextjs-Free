'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Typography, Link, Box, Divider } from '@mui/material';
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";

const Icons = () => {
  return (
    <PageContainer title="Icons" description="this is Icons">

      <DashboardCard title="Icons">

        <Typography variant="h6" gutterBottom>
          🔍 Explore Icons
        </Typography>
        <Typography variant="body1" gutterBottom>
          Browse and search for icons directly on the{' '}
          <Link
            href="https://tabler-icons.io/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="primary"
          >
            Tabler Icons website
          </Link>.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          ⚙️ Installation
        </Typography>


        <Typography variant="body1" gutterBottom>
          To use Tabler icons in your project, install the official React package:
        </Typography>
        <SyntaxHighlighter language="typescript" style={docco}>
          {` npm install @tabler/icons-react `}
        </SyntaxHighlighter>


        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          🧩 Usage Example
        </Typography>

        <Typography variant="body1" gutterBottom>
          Import and use any icon in your components:
        </Typography>
        <SyntaxHighlighter language="typescript" style={docco}>
          {`import { IconHome } from '@tabler/icons-react';
function MyComponent() {
  return <IconHome />;
}`}
        </SyntaxHighlighter>
      </DashboardCard>
    </PageContainer>
  );
};

export default Icons;
