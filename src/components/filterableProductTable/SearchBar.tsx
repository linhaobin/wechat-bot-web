import * as React from 'react'

// tslint:disable-next-line
export type OnFilterTextInputProp = (filterText: string) => void
export type OnInStockInputProp = (checked: boolean) => void

export interface Props {
  filterText: string
  inStockOnly: boolean
  onFilterTextInput: OnFilterTextInputProp
  onInStockInput: OnInStockInputProp
}

class SearchBar extends React.PureComponent<Props, {}> {
  public handleFilterTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onFilterTextInput(e.target.value)
  }

  public handleInStockInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onInStockInput(e.target.checked)
  }

  public render() {
    const { inStockOnly, filterText } = this.props

    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} onChange={this.handleFilterTextInputChange} />
        <p>
          <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockInputChange} /> Only show products in
          stock
        </p>
      </form>
    )
  }
}
export default SearchBar
