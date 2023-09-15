import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ListItemText } from "@mui/material";
import { labelBySortDirection, sortDirectionData } from "@/constants/constants";
import { SortDirection } from "@/types/types";

export default function SortDirectionButton({
  sortDirection,
  disabled,
  setSortDirection,
}: {
  sortDirection: SortDirection;
  disabled: boolean;
  setSortDirection: (newValue: SortDirection) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newSortDirection: SortDirection) => {
    setSortDirection(newSortDirection);
    setAnchorEl(null);
  };

  const renderMenuItems = () => {
    return Object.entries(labelBySortDirection).map(([key, label]) => (
      <MenuItem key={key} onClick={() => handleClose(key as SortDirection)}>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    ));
  };

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={disabled}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        {sortDirection}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(sortDirection)}
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
        {renderMenuItems()}
      </Menu>
    </div>
  );
}
