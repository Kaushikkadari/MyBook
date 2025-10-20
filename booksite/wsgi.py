import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(__file__))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booksite.settings')

application = get_wsgi_application()

# Vercel needs this
app = application








