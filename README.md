# Book Website - 3D Interactive Book Showcase

A stunning, modern book website built with Django, HTML, CSS, and JavaScript featuring amazing 3D visual effects and animations.

## 🌟 Features

- **3D Rotating Book Display** - Interactive 3D book that rotates automatically
- **Modern Gradient Design** - Beautiful purple gradient theme throughout
- **Smooth Animations** - Floating particles, fade-ins, and parallax effects
- **Responsive Design** - Works perfectly on all devices
- **PDF Download** - Direct download functionality for your book
- **Author Showcase** - Dedicated section for author information
- **Interactive Navigation** - Smooth scrolling and hover effects

## 📁 Project Structure

```
Book website/
├── booksite/              # Django project configuration
│   ├── settings.py       # Project settings
│   ├── urls.py           # Main URL configuration
│   ├── wsgi.py           # WSGI configuration
│   └── asgi.py           # ASGI configuration
├── book/                  # Main Django app
│   ├── views.py          # View functions
│   ├── urls.py           # App URL patterns
│   ├── models.py         # Database models
│   └── admin.py          # Admin configuration
├── templates/
│   └── book/
│       └── index.html    # Main website template
├── static/
│   ├── css/
│   │   └── style.css     # All styling and 3D effects
│   ├── js/
│   │   └── main.js       # Interactive JavaScript
│   └── images/
│       ├── author.png
│       ├── front cover.jpg
│       └── back cover.jpg
├── media/
│   └── book.pdf          # Your book PDF (add this file)
├── manage.py
└── requirements.txt
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

3. **Add Your Book PDF**
   - Place your book PDF file in the `media/` folder
   - Name it `book.pdf`

4. **Start the Development Server**
   ```bash
   python manage.py runserver
   ```

5. **Visit the Website**
   - Open your browser and go to: `http://127.0.0.1:8000/`

## 🎨 Customization

### Edit Book Information

Open `book/views.py` and modify the context dictionary in the `index` function:

```python
context = {
    'book_title': 'Your Book Title',
    'book_description': 'Your book description',
    'author_name': 'Your Name',
    'author_bio': 'Your biography',
    'publication_year': '2025',
    'pages': '350',
    'genre': 'Your Genre',
}
```

### Change Colors

Edit `static/css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --dark-color: #2d3436;
    --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Update Images

Replace these images in `static/images/`:
- `author.png` - Author photo
- `front cover.jpg` - Book front cover
- `back cover.jpg` - Book back cover

## 🎭 3D Effects & Animations

- **Rotating 3D Book** - Automatically rotates to showcase all sides
- **Mouse Hover Interaction** - Pause rotation and tilt with mouse
- **Floating Particles** - Dynamic background animations
- **Smooth Scrolling** - Elegant navigation transitions
- **Parallax Effects** - Depth and motion on scroll
- **Fade-in Animations** - Elements appear smoothly when scrolling
- **Gradient Overlays** - Modern color transitions

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🛠️ Admin Panel

Create a superuser to access the Django admin panel:

```bash
python manage.py createsuperuser
```

Then visit: `http://127.0.0.1:8000/admin/`

## 📦 Dependencies

- Django 4.2.7 - Web framework
- Pillow 10.1.0 - Image processing

## 🌐 Deployment

For production deployment:

1. Update `SECRET_KEY` in `booksite/settings.py`
2. Set `DEBUG = False` in settings
3. Configure `ALLOWED_HOSTS`
4. Set up a production database
5. Run `python manage.py collectstatic`
6. Use a production server (Gunicorn, uWSGI)
7. Configure a web server (Nginx, Apache)

## 📄 License

This project is open source and available for personal and commercial use.

## 🎯 Support

For issues or questions, please open an issue in the repository.

---

**Enjoy your beautiful book website!** 📚✨























