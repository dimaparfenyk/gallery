import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ImageGallery from "./components/ImageGallery";
import SearchBar from "./components/SearchBar";
import api from "./services/image-api";
import Button from "./components/Button/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [collection, setCollection] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [isPreLoading, setIsPreLoading] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [biggerImageUrl, setBiggerImageUrl] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 2500,
      closeOnClick: true,
      theme: "colored",
    };

    if (query === "") return;

    api
      .fetchImage(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length < 12 || totalHits / page < 12) {
          setIsDisable(true);
          toast.success("Вы просмотрели все изображения по данному запросу");
        }
        setIsPreLoading(true);
        setCollection((prev) => [...prev, ...hits]);
      })
      .catch((err) => {
        toast.error(`Ошибка- ${err}`, toastOptions);
      })
      .finally(() => setIsPreLoading(false));
  }, [query, page]);

  const handleFormSubmit = (queryValue) => {
    if (query === queryValue || queryValue === "") {
      return;
    }

    setCollection([]);
    setPage(1);
    setQuery(queryValue);
    setIsDisable(false);
  };

  const onLoadMore = () => {
    setPage((page) => page + 1);
    setIsPreLoading(true);
  };

  const openModal = ({ src, alt }) => {
    setBiggerImageUrl(src);
    setAlt(alt);
    setModalShown((prev) => !prev);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleFormSubmit} />
      {collection.length > 0 && <ToastContainer />}
      <ImageGallery images={collection} openModal={openModal} />
      <Loader isPreloading={isPreLoading} />
      {collection.length > 0 && !isDisable && (
        <Button onLoadMore={onLoadMore} isDisable={isDisable} />
      )}
      {modalShown && (
        <Modal
          src={biggerImageUrl}
          alt={alt}
          onClose={() => setModalShown((prev) => !prev)}
        />
      )}
    </div>
  );
}

export default App;
