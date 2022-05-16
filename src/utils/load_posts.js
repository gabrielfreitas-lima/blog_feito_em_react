export const loadPosts = async () => {
  // variaves que recebem da Api
  const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

  // variaveis que irão receber dos responses
  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  // variaves que convertem para json
  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postsAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url };
  });

  return postsAndPhotos;
};
