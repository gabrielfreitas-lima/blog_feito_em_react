import { Component } from "react";
import "./styles.css";

// é importado de components
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load_posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    // recebe os posts
    posts: [],

    // salva todos os posts
    allPosts: [],

    // indice da pagina
    page: 0,

    // numeros de posts por pagina
    postsPerPage: 8,

    searchValue: "",
  };

  // é iniciado junto com a pagina
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    // recebe a pagina e os posts por pagina
    const { page, postsPerPage } = this.state;

    // inicia depois de loadPosts
    const postsAndPhotos = await loadPosts();
    // renova/limpa o estado de posts e allPosts
    this.setState({
      // organiza os posts se baseando na pagina e os posts por pagina, inicio = page, fim = postsPerPage
      posts: postsAndPhotos.slice(page, postsPerPage),
      // enquanto posts espalha, allPosts deixa todos os posts guardados
      allPosts: postsAndPhotos,
    });
  };

  // carrega novos posts
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    // aumenta o volume da pagina
    const nextPage = page + postsPerPage;

    // carrega os proximos posts inicio = nextPage, fim = nextPage + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    // salva em um array único
    posts.push(...nextPosts);

    // limpa a pagina
    this.setState({ posts, page: nextPage });
  };

  /*
  // é iniciado quando algo atualiza na pagina
  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  // troca o elemento P quando clicado
  handlePClick = () => {
    this.setState({ name: "clicado!" });
  };

  // troca o link quando clicado
  handleAClick = (event) => {
    event.preventDefault();
    // recebe a variavel do objeto state
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };
*/

  handleChange = (evento) => {
    const { value } = evento.target;
    this.setState({ searchValue: value });
  };

  // renderiza tudo no html
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    /* filtra os posts, 
    ?se (existir algo em searchValue){
      post.filtro (de cada post => {
        retorna post.titulo.emCaixaBaixa().incluindo(os com os valores de searchValue.toLocaleLowerCase())
      }):senao
      posts;
    }*/
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title
            .toLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        })
      : posts;
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Procurando por: {searchValue}</h1>}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
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
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
