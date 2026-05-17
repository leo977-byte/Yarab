from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    ingredients = models.TextField(help_text="Enter ingredients separated by commas")
    instructions = models.TextField()
    #image requires 'Pillow' library installed. If you get an error, we can fix it later.
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'djangoproject'

    def __str__(self):
        return self.title