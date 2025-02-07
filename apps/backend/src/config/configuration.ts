export default () => ({
    protheus: {
      host: process.env.PROTHEUS_HOST,
      port: parseInt(process.env.PROTHEUS_PORT, 10),
      user: process.env.PROTHEUS_USER,
      password: process.env.PROTHEUS_PASS,
      db: process.env.PROTHEUS_DB,
    },
    dbsei: {
      host: process.env.DBSEI_HOST,
      port: parseInt(process.env.DBSEI_PORT, 10),
      user: process.env.DBSEI_USER,
      password: process.env.DBSEI_PASS,
      db: process.env.DBSEI_DB,
    },
    ldap: {
      url: process.env.LDAP_URL,
      bindDN: process.env.LDAP_BIND_DN,
      bindPass: process.env.LDAP_BIND_PASSWORD,
      searchBase: process.env.LDAP_SEARCH_BASE,
    }
  });