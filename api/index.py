import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booksite.settings')

import django
django.setup()

from booksite.wsgi import application

# Vercel handler
app = application


