module.exports = ({ env }) => ({
  host: env("LIVE_URL"),
  port: env.int("PORT", 1337),
  url: env("LIVE_URL"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "910f5455c13d759942f92aeb79a5b4e3"),
    },
  },
});
