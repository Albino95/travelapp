import React, { useState } from 'react'
import{ Autocomplete } from "@react-google-maps/api"
import { AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import makeStyles from './styles'

const Header = ({ setCoordinates }) => {

  const [autocomplete, setAutocomplete] = useState(null);

  const classes = makeStyles()
  const onLoad = (autoC) => setAutocomplete(autoC)
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({lat, lng})
  }


  return (
    <AppBar position = 'static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          TraveLite
        </Typography>
        <Box display='flex'>
        <Typography variant='h6' className={classes.title}>
          Eksploroni Vende te reja
        </Typography>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder='search...' classes={{root:classes.inputRoot, input: classes.inputInput}} />
          </div>
        </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header