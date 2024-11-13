# test_app.py
from flask_testing import TestCase
from app import create_app  # make sure this is correctly pointing to your Flask app

class TestFlaskApi(TestCase):
    def create_app(self):
        """Create and return a testing Flask application."""
        app = create_app({'TESTING': True, 'DEBUG': True})
        return app

    def test_post_data(self):
        response = self.client.post('/upload-data', json={
            'first_name': 'John', 
            'last_name': 'Doe', 
            'email': 'john@example.com',
            'device_os': 'Windows',
            'housing_status': 'BC',
            'credit_risk_score': '200',
            'days_since_request': 3.2801,
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['status'], 'success')

    def test_predict_data(self):
        response = self.client.get('/predict?model=random_forest')
        self.assertEqual(response.status_code, 202)
        self.assertTrue(response.json['prediction'])
