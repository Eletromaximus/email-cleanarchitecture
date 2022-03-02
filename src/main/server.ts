import app from './config/App'

app.listen(process.env.PORT || 4000, () => {
  console.log('Server running')
})
