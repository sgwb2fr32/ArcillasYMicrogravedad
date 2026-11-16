from flask import Flask, render_template
import os

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))

template_dir = os.path.join(base_dir, "templates")
static_dir = os.path.join(base_dir, "static")

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir, static_url_path="/static")

print("TEMPLATE DIR:", template_dir)
print("STATIC DIR:", static_dir)
print("STATIC EXISTS:", os.path.exists(static_dir))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/informe')
def informe():
    return render_template('descargas.html')

@app.route('/presentacion')
def presentacion():
    return render_template('descargas.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)