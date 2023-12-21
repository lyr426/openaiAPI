const express = require('express');
const app = express();

app.use(express.json()); 

const apiRoutes = require('./src/routes/api-router'); 
app.use('/api', apiRoutes); 

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('서버 에러 발생');
//   });

app.listen(8000, () => console.log('listening on port 8000'));
