import { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ImageGallery from "./components/ImageGallery";
import SearchBar from "./components/SearchBar";
import api from "./services/image-api";
import Button from "./components/Button/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    query: "",
    page: 1,
    totalHits: 0,
    collection: [],
    isDisable: false,
    isPreLoading: false,
    modalShown: false,
    biggerImageUrl: "",
    alt: "",
  };

  toastOptions = {
    position: "top-right",
    autoClose: 2500,
    closeOnClick: true,
    theme: "colored",
  };

  componentDidUpdate(_, prevState) {
    const { query: prevName, page: prevPage } = prevState;
    const {
      query: nextName,
      page: currPage,
      collection,
      totalHits: totalLength,
    } = this.state;

    if (prevName !== nextName || prevPage !== currPage) {
      api
        .fetchImage(nextName, currPage)
        .then(({ hits, totalHits }) => {
          this.setState((prevState) => ({
            isDisable: false,
            totalHits,
            collection:
              prevName === nextName ? [...prevState.collection, ...hits] : hits,
          }));

          if (collection.length >= totalLength && collection.length !== 0) {
            toast.success("Вы просмотрели все картинки", this.toastOptions);
            this.setState({ isDisable: true });
          }
        })
        .catch((err) => {
          toast.error(`Ошибка- ${err}`, this.toastOptions);
        })
        .finally(this.setState({ isPreLoading: false }));
    }
  }

  handleFormSubmit = (query) => {
    if (query !== this.state.query) {
      if (query.trim() === "") return;
      this.setState({ query, page: 1, collection: [], isPreLoading: true });
    } else {
      this.setState((prevState) => ({
        collection: prevState.collection,
      }));
    }
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      isPreLoading: true,
    }));
  };

  toggleModal = () => {
    this.setState({ modalShown: !this.state.modalShown });
  };

  openModal = (e) => {
    this.setState({
      biggerImageUrl: e.currentTarget.src,
      alt: e.target.alt,
    });
    this.toggleModal();
  };

  render() {
    const {
      collection,
      isDisable,
      totalHits,
      isPreLoading,
      modalShown,
      biggerImageUrl,
      alt,
    } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {totalHits > 0 && <ToastContainer />}
        <ImageGallery images={collection} openModal={this.openModal} />
        <Loader isPreloading={isPreLoading} />
        {collection.length > 0 && (
          <Button onLoadMore={this.onLoadMore} isDisable={isDisable} />
        )}
        {modalShown && (
          <Modal onClose={this.toggleModal} src={biggerImageUrl} alt={alt} />
        )}
      </div>
    );
  }
}

export default App;
