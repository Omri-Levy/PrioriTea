import {
  Container,
  cookieParser,
  cors,
  CORS_ORIGIN,
  DATABASE_URL,
  DataSource,
  express,
  helmet,
  json,
  morgan,
  urlencoded,
} from ".";

(async () => {
  useContainer(Container);

  new DataSource({
    type: `postgres`,
    url: DATABASE_URL,
  });

  const app = express();

  const middleware = [
    cookieParser(),
    cors({ origin: CORS_ORIGIN, credentials: true }),
    urlencoded({ extended: true }),
    json(),
    morgan,
    helmet(),
  ];

  middleware.forEach((mdw) => {
    app.use(mdw);
  });

  app.listen();
})();
