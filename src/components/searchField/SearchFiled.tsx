import { Component } from 'react';

import './_style.scss';

interface SearchSectionProps {
  searchValue: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchSectionState {
  inputValue: string;
  isCrashed: boolean;
}

export class SearchFiled extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      inputValue: props.searchValue,
      isCrashed: false,
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch(this.state.inputValue);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  throwError = () => {
    this.setState({ isCrashed: true });
  };

  render() {
    const { inputValue, isCrashed } = this.state;
    if (isCrashed) {
      throw new Error();
    }
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            className="search-input"
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
            placeholder="Enter name or random number"
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
        <button onClick={this.throwError} className="search-btn">
          Crash page...
        </button>
      </div>
    );
  }
}
