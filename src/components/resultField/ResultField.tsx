import { Buttons } from '../buttons/buttons';
import List from '../list/list';
import { Flyout } from '../flyout/flyout';
import { SearchParams } from '../../types/types';
import { Suspense } from 'react';
import Loader from '../../app/loading';

type Props = {
  searchParams: SearchParams;
};

export default async function ResultField({ searchParams }: Props) {
  const { page } = searchParams;
  console.log(page);
  return (
    <Suspense fallback={<Loader />}>
      <div className="results">
        <div className="results-container">
          <div className="results-catalog">
            <List searchParams={searchParams} />
          </div>
        </div>
        <Buttons searchParams={searchParams} />
        <Flyout />
      </div>
    </Suspense>
  );
}
