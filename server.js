// require('dotenv').config();
// require('express-async-errors'); 
// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const morgan = require('morgan');

// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const { errorHandler } = require('./middleware/errorMiddleware');

// const app = express();

// // connect DB
// connectDB();

// // middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// // routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// // error handler (should be last)
// app.use(errorHandler);

// // start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



//today 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Default route
app.get('/', (req, res) => res.send('Task Manager API Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
