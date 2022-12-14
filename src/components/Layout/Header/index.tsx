import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Drawer, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { postFilter, shopCart } from "../../../state/atom";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const [postFilterValue, setPostFilterValue] = useRecoilState(postFilter);
  const shopCartValue = useRecoilValue(shopCart);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length === 0) {
      setPostFilterValue(value);
    }
    setSearchText(value);
  };

  const handleSearch = () => {
    if (searchText?.length > 0) {
      setPostFilterValue(searchText);
      router.push("/buscar-eventos");
    }
  };

  useEffect(() => {
    handleTextLoad();
  }, []);

  const handleTextLoad = () => {
    if (searchText !== postFilterValue) setSearchText(postFilterValue);
  };
  const [open, setState] = useState(false);
  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  return (
    <header className={styles.header}>
      <Box
        className={styles.menuContainer}
        sx={{ display: { xs: "flex!important", md: "none!important" } }}
      >
        <IconButton
          className={styles.menuIcon}
          edge="start"
          aria-label="abrir-menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          variant="temporary"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: { width: "50%", padding: "10px" },
          }}
        >
          <IconButton
            className={styles.closeButton}
            edge="start"
            aria-label="abrir-menu"
            onClick={toggleDrawer(false)}
          >
            <CloseIcon className={styles.closeButtonIcon} />
          </IconButton>
          <nav className={styles.mobileMenu}>
            <Link href="/">Home</Link>
            <Link href="/">Perfil</Link>
            <Link href="/">Carrinho</Link>
          </nav>
        </Drawer>
      </Box>

      <Box
        className={styles.menuContainer}
        sx={{ display: { xs: "none!important", md: "flex!important" } }}
      >
        <div className={styles.headerContainer}>
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className={styles.logo} />
          </Link>
          <TextField
            size="small"
            className={styles.searchBar}
            value={searchText}
            onChange={handleText}
            InputProps={{
              endAdornment: (
                <IconButton
                  style={{
                    marginRight: "-14px",
                    backgroundColor: "var(--primary-color)",
                    color: "#fff",
                    borderRadius: 0,
                  }}
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </div>

        <nav className={styles.headerContainer}>
          <AccountCircleIcon className={styles.userIcon} />
          <Badge
            color="error"
            badgeContent={shopCartValue?.length}
            className={styles.cartCounter}
          >
            <ShoppingCartIcon className={styles.shopCartIcon} />
          </Badge>
        </nav>
      </Box>
    </header>
  );
};
export default Header;
