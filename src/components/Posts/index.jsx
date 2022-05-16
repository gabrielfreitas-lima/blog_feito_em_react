import { PostCard } from "../PostCard";
import './styles.css';

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (
      // PostCard recebe o atributo post quem manda as informações da api para a pasta de PostCard
      <PostCard key={post.id} post={post} />
    ))}
  </div>
);
