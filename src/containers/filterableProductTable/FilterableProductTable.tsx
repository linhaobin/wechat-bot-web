import * as React from 'react'

import ProductTable from '../../components/filterableProductTable/ProductTable'
import SearchBar, * as SearchBarType from '../../components/filterableProductTable/SearchBar'

export interface FilterableProductTableProps {
  products?: any[]
}

interface State {
  filterText: string
  inStockOnly: boolean
}

export default class FilterableProductTable extends React.PureComponent<FilterableProductTableProps, State> {
  public state = {
    filterText: '',
    inStockOnly: false
  }

  public handleFilterTextInput: SearchBarType.OnFilterTextInputProp = filterText => {
    this.setState({
      filterText
    })
  }

  public handleInStockInput: SearchBarType.OnInStockInputProp = inStockOnly => {
    this.setState({
      inStockOnly
    })
  }

  public render() {
    const { filterText, inStockOnly } = this.state
    return (
      <div>
        <SearchBar
          {...{ filterText, inStockOnly }}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <ProductTable {...{ filterText, inStockOnly }} products={PRODUCTS} />
      </div>
    )
  }
}

const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]
