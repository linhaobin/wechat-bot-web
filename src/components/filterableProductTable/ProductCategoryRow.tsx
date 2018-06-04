import * as React from 'react'

export interface ProductCategoryRowProps {
  category: any
}

export default class ProductCategoryRow extends React.PureComponent<ProductCategoryRowProps, {}> {
  public render() {
    return (
      <tr>
        <th colSpan={2}>{this.props.category}</th>
      </tr>
    )
  }
}