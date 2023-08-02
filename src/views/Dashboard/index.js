import React from "react";
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import styles from "./style.module.scss";
import { cards } from "./definitions";

const DashboardView = () => {
  const cardTemplate = (Icon, iconClassname, value, text) => {
    return (
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container alignItems="center">
              <Grid item>
                <Icon className={`${styles.cardIcon} ${iconClassname}`} />
              </Grid>
              <Grid item>
                <Typography variant="h5">{value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box
      component="main"
      className={styles.box}
      sx={{
        width: { md: `calc(100% - 250px)` },
      }}
    >
      <Toolbar />
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h5" className={styles.title}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aqui você encontrará informações sobre suas transações.
          </Typography>
        </Grid>
        {cards.map((item, index) => (
          <React.Fragment key={index}>
            {cardTemplate(
              item.cardIcon,
              item.iconClassname,
              item.value,
              item.text
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardView;
