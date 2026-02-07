import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, image }) {
    const { pathname } = useLocation();
    const siteUrl = "https://hexhive.solutions";
    const siteTitle = "HexHive Solutions";
    const defaultDescription = "Transform your passion into a high-growth tech career with expert-led programs.";
    const defaultKeywords = "tech education, DevOps, full-stack, embedded systems";
    const defaultImage = "/logo_full.png";

    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;
    const metaImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;
    const canonicalUrl = `${siteUrl}${pathname}`;

    return (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
        </Helmet>
    );
}
