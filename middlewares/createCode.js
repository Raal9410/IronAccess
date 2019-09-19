exports.guestCode = (min, max) =>{
  min = 1000
  max = 9999
  return (Math.random( )*(max-min)+ min)
}
