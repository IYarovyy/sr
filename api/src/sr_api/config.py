from os.path import dirname


class Config:
    BASE_DIR = dirname(dirname(__file__))
    DEBUG = False
    TESTING = False
    RUN_EVOLUTION = True
    DB_URL = ''
    DB_USER = ''
    DB_PWD = ''
    JWT_SECRET_KEY = "dsbkdjbfkjdkgjfnkjbnj ljhkm;l,h;lghmbc.vmcs m"
    PREDICT_MODEL_DEFAULT = f"{BASE_DIR}/../ai/best_model_mm.pt"
    PREDICT_SCALER_DEFAULT = f"{BASE_DIR}/../ai/scaler_mm.pkl"


class Development(Config):
    DEBUG = True
    DB_URL = 'postgresql://localhost:5432/ihor'
    DB_USER = ''
    DB_PWD = ''
    OPENAPI_VERSION = '0.1.0'
    OPENAPI_SERVER = [{"url": 'http://localhost:5000'}]


class Production(Config):
    RUN_EVOLUTION = True
