import React from 'react'
import {Helmet} from "react-helmet"
const Meta = ({title, description, keywords}) => {
    return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome To ProShop",
    description: "We sell the best electronics for cheap",
    keywords: "electronics, playstation, xbox series x, iphone, for sale, special"
}

export default Meta
