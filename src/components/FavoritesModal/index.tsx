import { IItem } from "@/types/types";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import styles from "@/styles/FavoritesModal.module.css";

export default function FavoritesModal({
  favorites,
  open,
  onClose,
  onToggleFavorite,
}: {
  favorites: IItem[];
  open: boolean;
  onClose: () => void;
  onToggleFavorite: (item: IItem) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredItems = favorites.filter((item) => {
    const lowerCaseTitle = item.title.toLowerCase();
    return lowerCaseTitle.includes(searchTerm.toLowerCase());
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modal}>
        {favorites.length === 0 ? (
          <Typography>
            Todavía no has marcado ningun item como favorito
          </Typography>
        ) : (
          <div>
            <div className={styles.title}>
              <Typography variant="h6">Mis favoritos</Typography>
            </div>
            <div className={styles.searchContainer}>
              <TextField
                className={styles.search}
                placeholder="Buscar"
                onChange={handleSearchInputChange}
                value={searchTerm}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <List dense sx={{ width: "100%", maxWidth: 360 }}>
              {filteredItems.length > 0 ? filteredItems.map((item, idx) => {
                return (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton
                        onClick={() => onToggleFavorite(item)}
                        edge="end"
                        aria-label="comments"
                      >
                        <FavoriteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={`Avatar ${item.title}`} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText id={idx.toString()} primary={item.title} />
                  </ListItem>
                );
              }) : <Typography>Lo sentimos, no se encontraron elementos que coincidan con tu búsqueda</Typography>}
            </List>
          </div>
        )}
      </Box>
    </Modal>
  );
}
