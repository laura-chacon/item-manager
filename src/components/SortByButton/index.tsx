import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Check } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { labelBySortableProperty } from "@/constants/constants";
import { SortableProperty } from "@/types/types";
import SortIcon from "@mui/icons-material/Sort";
var mobile = require('is-mobile');

export default function SortByButton({
  sortBy,
  setSortBy,
  unsetSortBy,
}: {
  sortBy?: SortableProperty;
  setSortBy: (newValue: SortableProperty) => void;
  unsetSortBy: () => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSelectSortingOption = (newSortBy: SortableProperty) => {
    if (newSortBy === sortBy) {
      unsetSortBy();
      return;
    }
    setSortBy(newSortBy);
    setAnchorEl(null);
  };

  const sortByLabel = sortBy && labelBySortableProperty[sortBy];

  return (
    <div>
      {mobile() ? (
        <IconButton
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="inherit"
        >
          <SortIcon />
        </IconButton>
      ) : (
        <Button
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {sortByLabel || "ordenar por"}
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {(Object.keys(labelBySortableProperty) as SortableProperty[]).map(
          (property) => (
            <MenuItem
              key={property}
              onClick={() => handleSelectSortingOption(property)}
            >
              {sortBy === property && (
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
              )}
              <ListItemText inset={sortBy !== property}>
                {labelBySortableProperty[property]}
              </ListItemText>
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
}
