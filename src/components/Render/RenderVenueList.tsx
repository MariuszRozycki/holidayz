import { Container, Row, Col } from "react-bootstrap";
import { HeadingH1, CustomCard, Pagination, SortOptions, SearchBar, GoToMainPageButton } from "../../components";
import { useFetchData } from "../../hooks";
import { useAppContext } from "../../context/app/useAppContext";

interface RenderVenueListProps {
  title: string;
  searchQuery?: string;
  showGoMainPage?: boolean;
}

const RenderVenueList = ({ title, searchQuery = "", showGoMainPage = false }: RenderVenueListProps) => {
  const { state, dispatch } = useAppContext();
  const { currentPage, isLoading, error, venues, sort, sortOrder, isSearching } = state;

  useFetchData(currentPage, searchQuery, 10, sort, sortOrder, dispatch);

  if (isLoading || isSearching) {
    return (
      <Container>
        <HeadingH1>Loading...</HeadingH1>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <HeadingH1>Error: {error}</HeadingH1>
      </Container>
    );
  }

  if (!venues.length) {
    return (
      <Container>
        <HeadingH1>No venues available</HeadingH1>
      </Container>
    );
  }

  return (
    <Container>
      <HeadingH1>{title}</HeadingH1>
      {showGoMainPage && <GoToMainPageButton />}
      <SearchBar />
      {!searchQuery && <SortOptions />}
      <Row className='g-3'>
        {venues.map((venue) => (
          <Col key={venue.id} sm={6} md={4} lg={3}>
            <CustomCard venue={venue} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
};

export default RenderVenueList;
