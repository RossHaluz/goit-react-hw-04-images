import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from 'components/Searchbar';
import { Container } from './App.styled';
import ImageGallery from 'components/ImageGallery';
import FetchPhotosGallery from 'components/api/api';
import LoadMore from 'components/LoadMoreBtn';
// import { ImageLoader } from 'components/Loader/Loader';
import { ThreeDots } from 'react-loader-spinner';

const App = () => {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (name === '') {
      return;
    }

    const FetchImages = async () => {
      setLoading(true);
      try {
        const images = await FetchPhotosGallery(name, page);
        setTotalHits(images.totalHits);
        if (images.totalHits === 0) {
          throw new Error();
        }
        setItems(prev => [...prev, ...images.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    FetchImages();
  }, [name, page]);

  const onChangePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getNameSerch = name => {
    if (name === '') {
      toast.error('Ведіть текст у пошук!');
      return;
    }
    setName(name);
    setItems([]);
    setError(null);
    setPage(1);
  };

  const isShowBtn = items.length < totalHits;

  return (
    <Container>
      <Searchbar onSubmit={getNameSerch} />
      <ImageGallery items={items} />
      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ display: 'block', margin: '0 auto' }}
          wrapperClassName=""
          visible={true}
        />
      )}
      {error && <p>Щось пішло не так :( Оновіть сторінку.</p>}
      {isShowBtn && <LoadMore changePage={onChangePage} />}
      <Toaster position="top-right" />
    </Container>
  );
};

export default App;
