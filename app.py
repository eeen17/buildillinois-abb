from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    # save file or process file here
    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True)
