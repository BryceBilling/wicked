import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import moment from "moment";
import { FixedSizeList } from "react-window";

const CrimeFeed = ({ crimes, onSelect }) => {
  const [visibleCrimes, setVisibleCrimes] = useState([]);

  const ROW_HEIGHT = 60; // The height of each row in the list
  const NUM_VISIBLE_ROWS = 12; // The number of rows visible in the list at once
  const TOTAL_ROWS = crimes.length; // The total number of rows in the list

  const renderRow = ({ index, style }) => {
    const crime = visibleCrimes[index];

    if (!crime) {
      return null;
    }

    return (
      <div style={style}>
        <ListItem
          disableGutters
          sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
        >
          <ListItemButton
            onClick={() => onSelect(crime)}
            sx={{ paddingBottom: "0rem" }}
          >
            <ListItemText
              primary={crime.THF_Reference}
              secondary={
                crime.Crime_Type && crime.Crime_Type.replaceAll(" | ", ", ")
              }
            />

            <div className="crime-feed-right">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      {moment().format("DD/MM/YYYY", crime.Date)}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Accused
                    </Typography>
                  </React.Fragment>
                }
                secondaryTypographyProps={{ align: "right" }}
              />
            </div>
          </ListItemButton>
        </ListItem>
      </div>
    );
  };

  useEffect(() => {
    // Load the initial set of visible crimes
    setVisibleCrimes(crimes.slice(0, NUM_VISIBLE_ROWS));
  }, [crimes]);

  // Load new crimes into the visible list as the user scrolls
  const loadMoreItems = (startIndex, stopIndex) => {
    const newCrimes = crimes.slice(startIndex, stopIndex + 1);
    setVisibleCrimes((prevCrimes) => [...prevCrimes, ...newCrimes]);
  };

  return (
    <FixedSizeList
      height={ROW_HEIGHT * NUM_VISIBLE_ROWS} // The height of the visible portion of the list
      itemCount={TOTAL_ROWS} // The total number of rows in the list
      itemSize={ROW_HEIGHT} // The height of each row in the list
      overscanCount={10} // The number of rows to render above and below the visible window
      onItemsRendered={({ visibleStartIndex, visibleStopIndex }) =>
        loadMoreItems(visibleStartIndex, visibleStopIndex)
      } // Load new crimes as the user scrolls
    >
      {renderRow}
    </FixedSizeList>
  );
};

export default CrimeFeed;
