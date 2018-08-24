const AppConfigs = {
    development: {
        host: "http://localhost:5000",
        oauth2: {
            clientId: '229884451978-jlhbp56mqrifit7tqm2qnle4tlqvdv58.apps.googleusercontent.com',
        }
    },
    production: {
        host: "http://localhost:5000",
        oauth2: {
            clientId: '229884451978-jlhbp56mqrifit7tqm2qnle4tlqvdv58.apps.googleusercontent.com',
        }
    }
};
  
export default AppConfigs[process.env.NODE_ENV || 'development'];
  