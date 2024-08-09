import Layout from '../components/layout.tsx/mainLayout';
import { SearchParams } from '../types/types';

type Props = {
  searchParams: SearchParams;
};

export default async function Home({ searchParams }: Props) {
  return <Layout searchParams={searchParams}>{null}</Layout>;
}
