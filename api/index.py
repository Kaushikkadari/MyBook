import os
import sys

# Add the project directory to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booksite.settings')

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Vercel handler
def handler(request, response):
    return application(request, response)

