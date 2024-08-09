import Link from 'next/link';
import { getPokemonByName } from '../../../utils/utils';
import { Card } from '../../../components/card/Card';

import { Suspense } from 'react';
import Layout from '../../../components/layout.tsx/mainLayout';
import { createSearchParams } from '../../../utils/createQueryParams';
import { SearchParams } from '../../../types/types';
import Loader from '../../loading';

type Props = {
  params: {
    id: string;
  };
  searchParams: SearchParams;
};

export default async function Details({ params, searchParams }: Props) {
  const { id } = params;
  const data = await getPokemonByName(id);

  return (
    <Layout searchParams={searchParams}>
      <div className="right-panel" data-testid="details">
        <Suspense fallback={<Loader />}>
          <Card data={data} />
        </Suspense>
        <Link href={`/?${createSearchParams(searchParams)}`} className="card-close" data-testid="card-close"></Link>
      </div>
    </Layout>
  );
}
