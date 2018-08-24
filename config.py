class Config(object):
    """
    Common configurations
    """
    CLIENT_ID = "229884451978-u1iqiahfmaj2d6fkjq8o5sdrusj6b88r.apps.googleusercontent.com"
    CLIENT_SECRET = "RzNrpoM6abst0x1IZtg0uSPl"
    AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'
    TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'
    USER_INFO = 'https://www.googleapis.com/userinfo/v2/me'
    SCOPE = ['profile', 'email'],
    SUPERVISOR_EMAIL = [
        'ducta.qc@gmail.com'
    ]

class DevelopmentConfig(Config):
    """
    Development configurations
    """
    DEBUG = True
    SQLALCHEMY_ECHO = True
    REDIS_HOST = "localhost"
    REDIS_PORT = 6379
    REDIS_URL = "redis://localhost:6379"
    REDIRECT_URI = "https://localhost:3000/oauth2/callback"

class ProductionConfig(Config):
    """
    Production configurations
    """
    DEBUG = False
    
app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}