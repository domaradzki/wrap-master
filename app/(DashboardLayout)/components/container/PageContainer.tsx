// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavbarBreadcrumbs from "../navbreadcrumbs/navbreadcrumbs";

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
  auth?: boolean;
};

const PageContainer = ({ auth, title, description, children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {!auth && <NavbarBreadcrumbs title={title ?? ""} />}
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
