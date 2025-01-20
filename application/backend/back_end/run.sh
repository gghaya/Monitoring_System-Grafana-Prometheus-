#!/bin/bash
python3 -m venv ../myenv
touch .env
bash -c "source ../myenv/bin/activate "
pip install -r /app/backend/requirements.txt
python /app/backend/manage.py runserver 0.0.0.0:8000