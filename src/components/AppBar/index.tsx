import { AppBar as MuiAppBar, Box, Toolbar } from "@mui/material";

export default function AppBar({
  searchInput,
  sortByButton,
  sortDirectionButton,
  favoriteButton,
}: {
  searchInput: React.ReactElement;
  sortByButton: React.ReactElement;
  sortDirectionButton: React.ReactElement;
  favoriteButton: React.ReactElement;
}) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <div>{searchInput}</div>
        <Box sx={{ flexGrow: 1 }} />
        <Box>{sortByButton}</Box>
        <Box>{sortDirectionButton}</Box>
        <Box>{favoriteButton}</Box>
      </Toolbar>
    </MuiAppBar>
  );
}
