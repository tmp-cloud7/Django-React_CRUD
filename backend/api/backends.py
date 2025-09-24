from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class PhoneOrEmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Try login with email
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                # Or login with phone
                user = User.objects.get(phone=username)
            except User.DoesNotExist:
                return None

        if user.check_password(password):
            return user
        return None
