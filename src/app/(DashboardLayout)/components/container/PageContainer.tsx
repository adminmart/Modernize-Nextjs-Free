// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>Dion Admin Dashboard</title>
        <meta name="description" content={"Dion Admin Dashboard"} />
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
