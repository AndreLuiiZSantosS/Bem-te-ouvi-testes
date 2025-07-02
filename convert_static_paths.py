import os

# Folder where your static templates are located
TEMPLATE_FOLDER = './doc/prototipos/templates'

def convert_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ensure {% load static %} is present at the top
    if '{% load static %}' not in content:
        content = '{% load static %}\n' + content

    # Replace CSS links
    content = content.replace('href="css/', 'href="{% static \'admin/css/')
    content = content.replace('src="js/', 'src="{% static \'admin/js/')
    content = content.replace('src="imagens/', 'src="{% static \'admin/img/')

    # Close Django static tags
    content = content.replace('.css">', '.css\' %}">')
    content = content.replace('.js">', '.js\' %}">')
    content = content.replace('.png">', '.png\' %}">')
    content = content.replace('.jpg">', '.jpg\' %}">')
    content = content.replace('.jpeg">', '.jpeg\' %}">')
    content = content.replace('.svg">', '.svg\' %}">')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[✓] Converted: {filepath}")

def convert_all_templates():
    for filename in os.listdir(TEMPLATE_FOLDER):
        if filename.endswith('.html'):
            filepath = os.path.join(TEMPLATE_FOLDER, filename)
            convert_file(filepath)

if __name__ == "__main__":
    convert_all_templates()
