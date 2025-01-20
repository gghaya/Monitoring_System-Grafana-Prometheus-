# Generated by Django 4.2.16 on 2024-12-10 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('messages_id', models.AutoField(primary_key=True, serialize=False)),
                ('message_content', models.CharField(max_length=512)),
                ('message_date', models.DateTimeField(auto_now_add=True)),
                ('user_one', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('user_two', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_2', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Messages',
                'ordering': ['-message_date'],
            },
        ),
    ]