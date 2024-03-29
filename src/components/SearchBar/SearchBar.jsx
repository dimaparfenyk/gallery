import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleNameChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <SearchIcon />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

// class oldSearchBar extends Component {
//   state = {
//     query: "",
//   };

//   handleNameChange = (e) => {
//     this.setState({ query: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.query);
//     this.setState({ query: "" });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <SearchIcon />
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default SearchBar;
