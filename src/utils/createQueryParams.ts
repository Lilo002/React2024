export const createSearchParams = ({
  page,
  search,
  theme,
}: {
  page: string | undefined;
  search: string | undefined;
  theme?: string | undefined;
}) => {
  const query: { page: string; search?: string; theme?: string } = { page: page || '1', search: search || '' };
  if (theme) query.theme = theme;
  const newSearchParams = new URLSearchParams(query).toString();

  return newSearchParams;
};
