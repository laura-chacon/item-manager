import { IItem } from "@/types/types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmailIcon from "@mui/icons-material/Email";

export default function Item({
  item,
  onToggleFavorite,
}: {
  item: IItem;
  onToggleFavorite: (item: IItem) => void;
}) {
  const { title, email, description, price, image, isFavorite } = item;

  return (
    <Card style={{ border: "none", boxShadow: "none" }}>
      <CardMedia
        sx={{ borderRadius: 4 }}
        component="img"
        height="284"
        image={image}
        alt="product image"
      />

      <CardContent sx={{ paddingBottom: "0" }}>
        <Typography variant="h5">{`${price}€`}</Typography>
        <Typography variant="h6">{title}</Typography>
        <Typography>{description}</Typography>
      </CardContent>

      <CardActions sx={{ padding: "0 0 0 8px" }}>
        <Tooltip
          title={
            isFavorite ? "Desmarcar como favorito" : "Marcar como favorito"
          }
        >
          <IconButton
            onClick={() => onToggleFavorite(item)}
            aria-label="add to favorites"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Enviar email a ${email}`}>
          <IconButton aria-label="send email to owner" href={`mailto:${email}`}>
            <EmailIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
