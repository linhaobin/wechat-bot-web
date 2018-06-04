import * as React from 'react'

export interface ProductRowProps {
  product: any
}

export default class ProductRow extends React.PureComponent<ProductRowProps, {}> {
  public render() {
    const name = this.props.product.stocked ? this.props.product.name : <span style={{ color: 'red' }}>{this.props.product.name}</span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
}
