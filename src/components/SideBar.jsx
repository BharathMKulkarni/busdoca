import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        sx={{
          width: "12vw",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "7vw",
            boxSizing: "border-box",
            marginTop: "5rem",
            height: "86vh",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["I", "S", "S", "D"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["A", "T", "S"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          
        </Typography>
      </Box> */}
    </Box>
  );
}
