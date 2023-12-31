module.exports = ({ env }) => ({
  host: env("http://localhost:1337", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("http://localhost:1337"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "910f5455c13d759942f92aeb79a5b4e3"),
    },
  },
});
