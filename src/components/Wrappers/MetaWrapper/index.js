import React, {useEffect} from 'react'
import { Helmet } from 'react-helmet'

const MetaWrapper = ({ 
  title = 'Studio Kevin Abosch', 
  description = 'Gallery for the 1111 collection', 
  keywords = '', 
  url = '',
  imageUrl = '', 
  children 
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [children])
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description.replace(/['"]+/g, '`')} />
        <meta name='keywords' content={keywords.replace(/['"]+/g, '`')} />
        <meta name="theme-color" content="#000000" />
        <meta name="og:title" content={title.replace(/['"]+/g, '`')} />
        <meta name="og:description" content={description.replace(/['"]+/g, '`')} />
        <meta name="og:image" content={imageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="og:url" content={url} />
        <meta name="og:url" content={url} />
        <meta name="og:type" content="website" />
        <meta property="og:title" content={title.replace(/['"]+/g, '`')} />
        <meta property="og:description" content={description.replace(/['"]+/g, '`')} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>
      <>
        {children}
      </>
    </>
  )
}

export default MetaWrapper
