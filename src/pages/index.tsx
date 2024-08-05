import { GetServerSideProps } from 'next';
import { getAllPokemon, getPokemonByName, getRunningQueriesThunk, pokemonApi } from '../store/api/api';
import { wrapper } from '../store/store';
import Layout from './layout';
import Head from 'next/head';

export default function Main() {
  return (
    <section>
      <Head>
        <title>Pokemon</title>
      </Head>
      <Layout children={null} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const page = Number(context.query.page) || 1;
  const search = (context.query.search as string) || '';

  let pokemonList = [];

  if (search) {
    await store.dispatch(getPokemonByName.initiate(search));
  } else {
    const listResult = await store.dispatch(getAllPokemon.initiate(page));
    pokemonList = listResult.data || [];
  }

  const detailedPokemonPromises = pokemonList.map((pokemon) => store.dispatch(getPokemonByName.initiate(pokemon.name)));

  await Promise.all(detailedPokemonPromises);
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});
