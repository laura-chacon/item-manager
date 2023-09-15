/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Grid from "@mui/material/Grid";
import { Dispatch, useCallback, useEffect, useState } from "react";
import Item from "@/components/Item/index";
import FavoritesModal from "@/components/FavoritesModal/index";
import AppBar from "@/components/AppBar/index";
import usePagination from "@/hooks/usePagination";
import { itemsApiURl, itemsPerPage } from "@/constants/constants";
import {
  IItem,
  ItemsResponse,
  SortableProperty,
  SortDirection,
} from "@/types/types";
import { useMyReducer } from "@/reducer/reducer";
import SearchInput from "@/components/SearchInput";
import SortByButton from "@/components/SortByButton";
import SortDirectionButton from "@/components/SortDirectionButton";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Pagination, Tooltip, Typography } from "@mui/material";
import { Action } from "@/reducer/actionTypes";

export default function Home() {
  const [state, dispatch] = useMyReducer();
  const [error, setError] = useState<string | null>(null);

  const paginatedData = usePagination(state.filteredItems, itemsPerPage);

  useEffect(() => {
    fetchData(dispatch, setError);
  }, [dispatch]);

  const onCloseModal = () => dispatch({ type: "CLOSE_MODAL" });

  const onOpenModal = () => dispatch({ type: "OPEN_MODAL" });

  const onSetSearchTerm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
      paginatedData.jump(0);
    },
    [dispatch, paginatedData]
  );

  const onSortBy = (newValue: SortableProperty) => {
    paginatedData.jump(0);
    dispatch({ type: "SET_SORT_BY", payload: newValue });
  };

  const onUnsetSortBy = () => {
    paginatedData.jump(0);
    dispatch({ type: "UNSET_SORT_BY" });
  };

  const onSetSortDirection = (newValue: SortDirection) => {
    paginatedData.jump(0);
    dispatch({ type: "SET_SORT_DIRECTION", payload: newValue });
  };

  const onClickFavorite = (item: IItem) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: item });
  };
  const onPaginationChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
    paginatedData.jump(page);
  };

  return (
    <>
      <Head>
        <title>Item manager</title>
        <meta name="description" content="List of items manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </Head>
      <main className={`${styles.main}`}>
        {error ? (
          <Typography variant="h6">{error}</Typography>
        ) : (
          <>
            <div className={styles.appBarContainer}>
              <AppBar
                searchInput={
                  <SearchInput
                    value={state.filters.searchTerm}
                    onChange={onSetSearchTerm}
                  />
                }
                sortByButton={
                  <SortByButton
                    sortBy={state.sort.sortBy}
                    setSortBy={onSortBy}
                    unsetSortBy={onUnsetSortBy}
                  />
                }
                sortDirectionButton={
                  <SortDirectionButton
                    sortDirection={state.sort.sortDirection}
                    setSortDirection={onSetSortDirection}
                    disabled={!state.sort.sortBy}
                  />
                }
                favoriteButton={
                  <Tooltip title="Mostrar mis favoritos">
                    <IconButton
                      onClick={onOpenModal}
                      size="large"
                      color="inherit"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </div>
            <Grid
              alignItems="flex-start"
              container
              spacing={3}
              className={styles.grid}
            >
              {state.filteredItems.length > 0 ? paginatedData.currentData().map((item: IItem, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                  <Item item={item} onToggleFavorite={onClickFavorite} />
                </Grid>
              )): <Typography>Lo sentimos, no se encontraron elementos que coincidan con tu búsqueda</Typography>}
            </Grid>
            <div className={styles.pagination}>
              <Pagination
                count={Math.ceil(state.filteredItems.length / itemsPerPage)}
                size="large"
                page={state.filters.currentPage}
                variant="outlined"
                shape="rounded"
                onChange={onPaginationChange}
              />
            </div>
            <FavoritesModal
              open={state.showFavoritesModal}
              favorites={state.favorites}
              onClose={onCloseModal}
              onToggleFavorite={onClickFavorite}
            />
          </>
        )}
      </main>
    </>
  );
}

const fetchData = async (
  dispatch: Dispatch<Action>,
  setError: (newErrorMessage: string) => void
) => {
  try {
    const response = await fetch(itemsApiURl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: ItemsResponse = await response.json();

    dispatch({ type: "SET_DATA", payload: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    setError("Ha habido un error. Por favor, prueba más tarde.");
  }
};
