import os
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pickle
from datetime import datetime
import pandas as pd
from sqlalchemy import desc

import logging


db = SQLAlchemy()

with open('models/preprocessor.pkl', 'rb') as f:
    preprocessor = pickle.load(f)

def load_model(path):
    with open(path, 'rb') as f:
        return pickle.load(f)
models = {
    'Random Forest': load_model('models/random_forest_model.pkl'),
    'XGBoost': load_model('models/xgboost_model.pkl'),
    'LightGBM': load_model('models/lightgbm_model.pkl'),
    'Logistic Regression': load_model('models/logistic_regression_model.pkl')
}

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    model_name = db.Column(db.String(50), nullable=False)
    prediction_result = db.Column(db.String(50), nullable=False)

class UserInput(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    days_since_request = db.Column(db.Float, nullable=False)
    credit_risk_score = db.Column(db.Integer, nullable=False)
    housing_status = db.Column(db.String(50), nullable=False)
    device_os = db.Column(db.String(50), nullable=False)


    def set_attrs(self, attrs):
        for key, value in attrs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def get_input(self):
        return {
            'housing_status': self.housing_status, 
            'device_os': self.device_os,
            'name_email_similarity': self.first_name in self.email, 
            'credit_risk_score': self.credit_risk_score, 
            'days_since_request': self.days_since_request
        }

    def __repr__(self):
        return f'<UserInput {self.id}>'

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True, static_folder='frontend/build')
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mylocaldb.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    if test_config:
        app.config.update(test_config)

    
    db.init_app(app)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    @app.route('/upload-data', methods=['POST'])
    def upload_data():
        if request.method == 'POST':
            data = request.json
            new_input = UserInput()
            try:
                new_input.set_attrs(data)
                db.session.add(new_input)
                db.session.commit()
                return jsonify({"status": "success", "message": "Data received"}), 201
            
            except Exception as e:
                logging.error(f"An error occurred: {e}")
                db.session.rollback()
                return jsonify({'error': str(e)}), 500

    @app.route('/predict', methods=['GET'])
    def predict():
        model_name = request.args.get('model')
        if model_name not in models:
            return jsonify({"error": "Model not found"}), 404

        
        model = models[model_name]
        try:
            latest_user_input = UserInput.query.order_by(desc(UserInput.id)).first()
            input_df = pd.DataFrame([latest_user_input.get_input()])

            logging.info(f"An error occurred: {input_df}")
            preprocessed_data = preprocessor.transform(input_df)
            prediction = model.predict(preprocessed_data)
            new_prediction = Prediction(user_id=latest_user_input.id,model_name=model_name, prediction_result=str(prediction[0]))
            db.session.add(new_prediction)
            db.session.commit()
            return jsonify({"prediction": str(prediction[0])}), 202
        
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    return app

if __name__ == '__main__':
    app = create_app({'TESTING': True, 'DEBUG': True})

    with app.app_context():
        db.create_all()
    app.run(use_reloader=True, port=3000, threaded=True)
