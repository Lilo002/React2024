import './_style.scss';
import { Link, useParams } from 'react-router-dom';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Card } from '../card/Card';
import { Loader } from '../loader/loader';
import { useGetPokemonByNameQuery } from '../../store/api/api';

export function Details() {
  const { id } = useParams();

  const { createSearchParams, getPageValue, navigateToMainPage } = useNavigateMethods();

  const { data, isFetching, isError } = useGetPokemonByNameQuery(id ?? '', {
    skip: !id,
  });

  if (isError) navigateToMainPage();

  return (
    <div className="right-panel" data-testid="details">
      {isFetching ? <Loader data-testid="detailed-loader" /> : data && <Card data={data} />}
      <Link
        to={{ pathname: '/', search: createSearchParams(getPageValue()) }}
        className="card-close"
        data-testid="card-close"
      ></Link>
    </div>
  );
}
