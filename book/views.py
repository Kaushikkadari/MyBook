from django.shortcuts import render
from django.http import FileResponse, Http404
import os
from django.conf import settings


def index(request):
    """Main page view with book information"""
    context = {
        'book_title': '7 Equations & One Unsolved Heart',
        'book_description': 'A captivating journey through the mysteries of love and life, where logic meets emotion.',
        'author_name': 'Kaushik Kadari',
        'author_bio': 'Kaushik Kadari is a storyteller who turns quiet moments of life into words that linger in the heart. With a B.Tech in Computer Science and expertise in AI & ML, he blends logic with emotion — capturing the beautiful unpredictability of human feelings. <br><br>7 Equations & One Unsolved Heart marks his captivating debut, inviting readers to explore the mysteries of love and life through his eyes.',
        'publication_year': 'Scheduled for Release — Next Month, 2025',
        'pages': '169',
        'genre': 'Non-fiction',
    }
    return render(request, 'book/index.html', context)


def download_book(request):
    """Download book PDF"""
    file_path = os.path.join(settings.MEDIA_ROOT, 'book.pdf')
    if os.path.exists(file_path):
        response = FileResponse(open(file_path, 'rb'), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="book.pdf"'
        return response
    else:
        raise Http404("Book PDF not found. Please add your book.pdf to the media folder.")



