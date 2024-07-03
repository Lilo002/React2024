import { Component } from 'react';

interface SearchSectionProps {
  searchValue: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchSectionState {
  inputValue: string;
}

export class SearchFiled extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      inputValue: props.searchValue,
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state.inputValue);
    this.props.onSearch(this.state.inputValue);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search-section">
        <h2></h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={inputValue} onChange={this.handleInputChange} placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
