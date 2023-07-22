const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://toxicity.nomoredomains.rocks',
  'http://toxicity.nomoredomains.rocks',
];

const corsOptions = {
  origin: allowedCors,
  credentials: true,
  sameSite: 'none',
  httpOnly: true,
};

module.exports = corsOptions;
