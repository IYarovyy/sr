from quart import Blueprint
from quart_jwt_extended import (
    create_access_token, jwt_refresh_token_required, get_jwt_identity, jwt_required, get_raw_jwt
)
from quart_schema import (validate_request, validate_response)

from sr_api.controllers.ctrl_models import (LoginData, AuthData, ErrorMsg)
from sr_api.services import user as user_service
from sr_api.services.user import AuthorizationException

controller = Blueprint('auth', __name__, url_prefix='/auth')


def add_claims_to_access_token(user):
    return {"role": user.urole}


def user_identity_lookup(user):
    return user.email


blacklist = set()


def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token["jti"]
    return jti in blacklist


@controller.post('/login')
@validate_request(LoginData)
@validate_response(AuthData, 200)
@validate_response(ErrorMsg, 401)
async def login(data: LoginData):
    try:
        user = await user_service.check_password(data)
        if user:
            access_token = create_access_token(identity=user)
            ret = AuthData(access_token)
            return ret, 200
    except AuthorizationException as e:
        return ErrorMsg(e.message), 401


@controller.post("/refresh")
@jwt_refresh_token_required
async def refresh():
    current_user = get_jwt_identity()
    ret = {"access_token": create_access_token(identity=current_user)}
    return ret, 200


# Endpoint for revoking the current users access token
@controller.delete("/logout")
@jwt_required
async def logout():
    jti = get_raw_jwt()["jti"]
    blacklist.add(jti)
    return {"msg": "Successfully logged out"}, 200


# Endpoint for revoking the current users refresh token
@controller.delete("/logout2")
@jwt_refresh_token_required
async def logout2():
    jti = get_raw_jwt()["jti"]
    blacklist.add(jti)
    return {"msg": "Successfully logged out"}, 200
