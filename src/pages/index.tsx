import { GetServerSideProps } from 'next';
import { pokemonApi } from '../store/api/api';
import { wrapper } from '../store/store';
import { Layout } from './layout';

export default function Main() {
  return <Layout children={null} />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const page = Number(context.query.page) || 1;
  const search = (context.query.search as string) || '';

  let pokemonList = [];

  if (search) {
    await store.dispatch(pokemonApi.endpoints.getPokemonByName.initiate(search));
  } else {
    const listResult = await store.dispatch(pokemonApi.endpoints.getAllPokemon.initiate(page));
    pokemonList = listResult.data || [];
  }

  const detailedPokemonPromises = pokemonList.map((pokemon) =>
    store.dispatch(pokemonApi.endpoints.getPokemonByName.initiate(pokemon.name)),
  );

  await Promise.all(detailedPokemonPromises);

  return {
    props: {},
  };
});
