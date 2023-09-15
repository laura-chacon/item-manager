import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@/styles/SearchInput.module.css";

export default function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextField
      size="small"
      placeholder="Buscar"
      InputProps={{
        classes: {
          root: styles.input,
        },
        startAdornment: (
          <InputAdornment position="start" className={styles.searchIcon}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={onChange}
    />
  );
}
