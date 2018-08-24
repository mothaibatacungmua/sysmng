const AppConfigs = {
    development: {
        host: "http://localhost:5000",
        oauth2: {
            clientId: '229884451978-u1iqiahfmaj2d6fkjq8o5sdrusj6b88r.apps.googleusercontent.com',
        }
    },
    production: {
        host: "http://localhost:5000",
        oauth2: {
            clientId: '229884451978-u1iqiahfmaj2d6fkjq8o5sdrusj6b88r.apps.googleusercontent.com',
        }
    }
};
  
export default AppConfigs[process.env.NODE_ENV || 'development'];
  