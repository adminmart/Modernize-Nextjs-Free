// import { Helmet } from 'react-helmet';
import react from 'react'


type Props = {
  description?: string;
  children: React.ReactNode;
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (

  <div>

    <title>{title}</title>
    <meta name="description" content={description} />

    {children}
  </div>

);

export default PageContainer;
