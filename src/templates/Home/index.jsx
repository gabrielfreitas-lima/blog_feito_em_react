import { useState, useEffect, useCallback } from "react";
import "./styles.css";

// é importado de components
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load_posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title
            .toLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        })
      : posts;

      
      const handleLoadPosts = useCallback(async ( page, postsPerPage) => {
        // inicia depois de loadPosts
        const postsAndPhotos = await loadPosts();
        // organiza os posts se baseando na pagina e os posts por pagina, inicio = page, fim = postsPerPage
        setPosts(postsAndPhotos.slice(page, postsPerPage));
        // enquanto posts espalha, allPosts deixa todos os posts guardados
        setAllPosts(postsAndPhotos);
      }, []);
      
      useEffect(() => {
        handleLoadPosts(0, postsPerPage);
      }, [handleLoadPosts, postsPerPage])

      // carrega novos posts
      const loadMorePosts = () => {
        // aumenta o volume da pagina
        const nextPage = page + postsPerPage;
    
        // carrega os proximos posts inicio = nextPage, fim = nextPage + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
        // salva em um array único
        posts.push(...nextPosts);
    
        // limpa a pagina
        setPosts(posts);
        setPage(nextPage);
      };
      
      const handleChange = (evento) => {
        const { value } = evento.target;
        setSearchValue(value)
      };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Procurando por: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      <div className="error-search-container">
        {filteredPosts.length === 0 && (
          <h1>
            hum, parece que não foi possivel encontrar: "{searchValue}" :{"("}
          </h1>
        )}
      </div>

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Mais posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;