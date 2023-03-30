import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://sildenafilcm.com/graphql',
  cache: new InMemoryCache(),
});

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    const { data } = await client.query({
      query: gql`
        query GetPostBySlug($slug: String!) {
          postBy(slug: $slug) {
            id
            title
            slug
          }
        }
      `,
      variables: { slug },
    });

    const post = data.postBy;

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
