import React, {useState, useEffect, createRef} from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import PlaceDetails from '../Place Details/PlaceDetails'

import makeStyles from './styles'


const List = ({ places, childCliked, isLoading, type, setType, rating, setRating }) => {
  const classes = makeStyles();
  console.log({ childCliked })
  const [ elRefs, setElRefs ] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, index) => elRefs[index] || createRef())
    setElRefs(refs)
  }, [places])
  
  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restorante Hotele dhe pika Atraksioni prane jush</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>
      ): (
      <>
      <FormControl className={classes.formControl}>
        <InputLabel>Lloji</InputLabel>
        <Select value={type} onChange={(e)=> setType(e.target.value)}>
          <MenuItem value='restaurants'>Restorante</MenuItem>
          <MenuItem value='hotels'>Hotele</MenuItem>
          <MenuItem value='attractions'>Atraksione Turistike</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Vleresimi</InputLabel>
        <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
          <MenuItem value={0}>Shfaq gjithcka</MenuItem>
          <MenuItem value={3}>3* e siper</MenuItem>
          <MenuItem value={4}>4* e siper</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {
          places?.map((place,index) => (
            <Grid item key={index} xs={12} >
              <PlaceDetails 
              place={place}
              selected={Number(childCliked)===index}
              refProps={elRefs[index]}
              />
            </Grid>
          ))
        }
      </Grid>
      </>
      )}
    </div>
  )
}

export default List;