import cors from 'cors';

const corsOptions = cors({
  origin: [
    'http://localhost:3000',
    'https://itsecwb-aawj.xyz',
    'http://localhost:4173',
  ],
  credentials: true,
});

export default corsOptions;
