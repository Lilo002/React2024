import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Card } from '../../components/card/Card';
import { Loader } from '../../components/loader/loader';
import { getAllPokemon, getPokemonByName, getRunningQueriesThunk, useGetPokemonByNameQuery } from '../../store/api/api';
import Layout from '../layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store/store';
import { useEffect, useState } from 'react';
import { ResponseItem } from '../../types/types';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const page = Number(context.query.page) || 1;
  const search = (context.query.search as string) || '';

  let pokemonList: undefined | null | ResponseItem[] = [];

  if (search) {
    await store.dispatch(getPokemonByName.initiate(search));
  } else {
    const listResult = await store.dispatch(getAllPokemon.initiate(page));
    pokemonList = listResult.data || [];
    if (pokemonList) {
      const detailedPokemonPromises = pokemonList.map((pokemon) =>
        store.dispatch(getPokemonByName.initiate(pokemon.name)),
      );
      await Promise.all(detailedPokemonPromises);
    }
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default function Details() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createSearchParams, navigateToMainPage, getPageValue } = useNavigateMethods();

  const { id } = router.query;

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      setIsLoading(false);
    };
  }, [router]);

  const result = useGetPokemonByNameQuery(typeof id === 'string' ? id : skipToken, { skip: router.isFallback });

  const { isError, data } = result;

  if (isError) navigateToMainPage();

  return (
    <Layout>
      <div className="right-panel" data-testid="details">
        {isLoading || id !== data?.name ? <Loader data-testid="detailed-loader" /> : data && <Card data={data} />}
        <Link
          href={{ pathname: '/', search: createSearchParams(getPageValue()) }}
          className="card-close"
          data-testid="card-close"
        ></Link>
      </div>
    </Layout>
  );
}
