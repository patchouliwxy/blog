import { Helmet } from "react-helmet-async";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

interface SeoProps {
  title: string;
  description?: string;
}

export const Seo = ({ title, description = SITE_DESCRIPTION }: SeoProps) => (
  <Helmet>
    <title>{`${title} | ${SITE_NAME}`}</title>
    <meta name="description" content={description} />
  </Helmet>
);
