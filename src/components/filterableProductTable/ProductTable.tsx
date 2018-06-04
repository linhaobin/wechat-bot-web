import * as React from 'react'

import ProductCategoryRow from './ProductCategoryRow'
import ProductRow from './ProductRow'

export interface ProductTableProps {
  products: any[]
  filterText: string
  inStockOnly: boolean
}

export default class ProductTable extends React.PureComponent<ProductTableProps, {}> {
  public render() {
    // const rows: any[] = []
    // let lastCategory: any = null
    // .forEach(product => {
    // if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
    //   return
    // }
    // if (product.category !== lastCategory) {
    //   rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
    // }
    // rows.push(<ProductRow product={product} key={product.name} />)
    // lastCategory = product.category
    // })

    const rows = this.props.products
      .filter(product => {
        return product.name.indexOf(this.props.filterText) !== -1 && (product.stocked || !this.props.inStockOnly)
      })
      .map((product, i, arr) => {
        const last = arr[i - 1]
        if (product.category !== (last && last.category)) {
          return <ProductCategoryRow category={product.category} key={product.category} />
        }
        return <ProductRow product={product} key={product.name} />
      })
      
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}
