import 'module-alias/register'
import app from './config/app'

const port = process.env.APP_PORT

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
